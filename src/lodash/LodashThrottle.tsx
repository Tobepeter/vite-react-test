import { useLatest, useMemoizedFn } from 'ahooks'
import { Button, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import { throttle } from 'lodash-es'
import { useCallback, useEffect, useRef, useState } from 'react'

const { Title } = Typography

export const LodashThrottle = () => {
  const [data, setData] = useState<DataType[]>([])
  const lastExecTime = useRef(0)

  const getDiffTime = (startTime: number, endTime?: number) => {
    return dayjs(endTime || Date.now()).diff(dayjs(startTime), 'second', true)
  }

  const throttledFn = useCallback(
    throttle((data: DataType[], index: number) => {
      const duration = getDiffTime(data[index].startTime)
      let delta = 0
      if (lastExecTime.current) {
        delta = getDiffTime(lastExecTime.current)
      }
      lastExecTime.current = Date.now()
      data[index].duration = duration
      data[index].execTime = delta
      setData([...data])
    }, 1000),
    []
  )

  /**
   * 取消计时器
   * 如果想和 hooks 更好的结合，建议使用 ahooks 的 useThrottleFn
   */
  useEffect(() => {
    return () => {
      throttledFn.cancel()
    }
  }, [throttledFn])

  const handleClick = useMemoizedFn(() => {
    const startTime = Date.now()
    const nextindex = data.length

    setData(prev => {
      const currData = [...prev, { startTime, duration: -1, execTime: -1 }]
      // 执行函数时候，必须拿到最新的值，而不是等到render时候
      throttledFn(currData, nextindex)
      return currData
    })
  })

  return (
    <Space direction='vertical' size='large'>
      <Title level={2}>Lodash Throttle</Title>
      <Space>
        <Button onClick={handleClick}>点击</Button>
      </Space>
      <div>
        {data.map((item, index) => {
          const text = item.duration === -1 ? '未执行' : `run：${item.duration}s, 距离上次执行：${item.execTime}s`
          return (
            <div key={index}>
              第{index + 1}次点击，{text}
            </div>
          )
        })}
      </div>
    </Space>
  )
}

interface DataType {
  startTime: number
  duration: number
  execTime: number
}
