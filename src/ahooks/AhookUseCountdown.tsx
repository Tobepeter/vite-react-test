import { useCountDown } from 'ahooks'
import { Button, Flex, Space } from 'antd'
import { useState } from 'react'

const CountDownDate = () => {
  const [targetDate, setTargetDate] = useState(Date.now())
  const [count, formattedRes] = useCountDown({
    targetDate,
  })

  const start = () => {
    setTargetDate(Date.now() + 60 * 1000)
  }

  return (
    <Space direction='vertical'>
      <div>count: {count}</div>
      <div>
        {formattedRes.days} 天 {formattedRes.hours} 小时 {formattedRes.minutes} 分钟 {formattedRes.seconds} 秒
      </div>
      <Button
        onClick={() => {
          start()
        }}
      >
        开始
      </Button>
    </Space>
  )
}

const CountDownLeft = () => {
  // 单位是ms，无法使用开启
  const [count, formattedRes] = useCountDown({
    leftTime: 60 * 1000, // 单位是ms
  })
  return (
    <Flex dir='col'>
      <div>{count}</div>
    </Flex>
  )
}

export const AhookUseCountdown = () => {
  return (
    <>
      <CountDownDate />
      <CountDownLeft />
    </>
  )
}
