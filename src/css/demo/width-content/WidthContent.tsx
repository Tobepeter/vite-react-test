import { Card, Typography } from 'antd'

/**
 * 学习 fit-content
 *
 * fit-content = min(max-content, max(min-content, available-space))
 */
export const WidthContent = () => {
  const { Title, Text } = Typography

  return (
    <div className='p-5 max-w-3xl mx-auto space-y-4'>
      {/* auto 和 fit-content  */}
      <Card title={<Title level={3}>1. width: auto 和 fit-content</Title>}>
        <div className='space-y-2'>
          <Text>width: auto 和 width: fit-content 确实在某些情况下表现相似</Text>
          <Text>width: auto 块级元素：填满父容器的宽度（类似 fill-available）</Text>
          <Text>width: auto 内联元素：根据内容调整宽度（类似 fit-content）</Text>
          <Text>width: auto 行为取决于元素的 display 类型</Text>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          <div className='w-fit bg-purple-200 px-4 py-2 rounded-md text-purple-800'>
            <Text>hello world</Text>
          </div>
          <div className='bg-purple-200 px-4 py-2 rounded-md text-purple-800'>
            <Text>hello world</Text>
          </div>
        </div>
      </Card>

      {/* fill-available 和 max-content */}
      <Card title={<Title level={3}>2. width: fill-available 和 width: max-content</Title>}>
        <div className='space-y-2'>
          <Text>max-content 允许超出当前容器的宽度</Text>
        </div>

        <div className='flex flex-col gap-4 mt-4'>
          <div className='w-fit bg-purple-200 px-4 py-2 rounded-md text-purple-800'>
            <Text>hello world</Text>
          </div>
          <div className='bg-purple-200 px-4 py-2 rounded-md text-purple-800 w-max'>
            <Text>{'hello world'.repeat(20)}</Text>
          </div>
        </div>
      </Card>
    </div>
  )
}
