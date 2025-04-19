import { useState } from 'react'
import { Button, Card, Space, message, Spin } from 'antd'
import delay from 'delay'

export const PerfChrome = () => {
  const [loading, setLoading] = useState(false)

  const heavy = () => {
    const count = 10e7
    for (let i = 0; i < count; i++) {
      Math.sqrt(Math.random())
    }
  }

  const wait = async () => {
    await delay(16)
  }

  const test_console_time = async () => {
    setLoading(true)
    await wait()
    console.time('heavy')
    heavy()
    console.timeEnd('heavy')
    setLoading(false)
    message.info('heavy done')
  }

  const test_console_timestamp = async () => {
    setLoading(true)
    await wait()
    console.timeStamp('heavy start')
    heavy()
    console.timeStamp('heavy end')
    setLoading(false)
    message.info('heavy done')
  }

  const test_performance_measure = async () => {
    setLoading(true)
    await wait()
    performance.mark('heavy start')
    heavy()
    performance.mark('heavy end')
    performance.measure('heavy', 'heavy start', 'heavy end')
    setLoading(false)
    message.info('heavy done')
  }

  const buttons = [
    {
      label: 'console time',
      onClick: test_console_time,
    },
    {
      label: 'console timestamp',
      onClick: test_console_timestamp,
    },
    {
      label: 'performance measure',
      onClick: test_performance_measure,
    },
  ]

  return (
    <Card title='PerfChrome'>
      <Spin spinning={loading}>
        <Space direction='vertical' style={{ width: '100%' }}>
          {buttons.map(button => (
            <Button key={button.label} loading={loading} onClick={button.onClick} type='primary' block>
              {button.label}
            </Button>
          ))}
        </Space>
      </Spin>
    </Card>
  )
}
