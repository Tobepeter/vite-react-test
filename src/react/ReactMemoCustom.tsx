import { Button, Space, Typography } from 'antd'
import { isEqual } from 'lodash-es'
import { memo, useRef, useState } from 'react'

const { Title } = Typography

/**
 * 自定义 memo 比较函数
 *
 * 默认引用类型只会比较地址
 * 如果需要比较内容，需要自定义比较函数
 */
export const ReactMemoCustom = () => {
  const [arr, setArr] = useState([1, 2, 3])

  return (
    <Space direction='vertical' size='large'>
      <Title level={2}>React.memo 自定义</Title>
      <MemoChild arr={arr} />
      <MemoCustonChild arr={arr} />
      <Space>
        <Button onClick={() => setArr([1, 2, 3])}>设置123</Button>
        <Button onClick={() => setArr([4, 5, 6])}>设置456</Button>
      </Space>
    </Space>
  )
}

const MemoChild = memo(({ arr }: { arr: number[] }) => {
  const renderCount = useRef(0)
  renderCount.current++
  return (
    <>
      <div>{`渲染次数 ${renderCount.current}`}</div>
      <div>Child {arr.join(',')}</div>
    </>
  )
})

const MemoCustonChild = memo(
  ({ arr }: { arr: number[] }) => {
    const renderCount = useRef(0)
    renderCount.current++
    return (
      <>
        <div>{`渲染次数 ${renderCount.current}`}</div>
        <div>Child {arr.join(',')}</div>
      </>
    )
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.arr, nextProps.arr)
  }
)
