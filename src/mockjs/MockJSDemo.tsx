import { Card, Button } from 'antd'
import { useEffect, useState } from 'react'
import Mock from 'mockjs'

export const MockJSDemo = () => {
  const [mockData, setMockData] = useState<any>(null)

  const simple = () => {
    const data = Mock.mock({
      'list|1-10': [
        {
          'id|+1': 1,
          'name|1-10': '@cword(5, 10)',
          'age|18-60': 1,
          'address|1': ['北京', '上海', '广州', '深圳'],
        },
      ],
    })
    setMockData(data)
  }

  const image = () => {
    const data = Mock.mock({
      'image|1-10': '@image(200x100, #000000, #ffffff, 100, 100)',
    })
    setMockData(data)
  }

  const date = () => {
    const data = Mock.mock({
      date: '@date',
      datetime: '@datetime',
      time: '@time',
      now: '@now',
    })
    setMockData(data)
  }

  const color = () => {
    const data = Mock.mock({
      color: '@color',
      hex: '@hex',
      rgb: '@rgb',
      rgba: '@rgba',
    })
    setMockData(data)
  }

  const text = () => {
    const data = Mock.mock({
      title: '@title',
      sentence: '@sentence',
      paragraph: '@paragraph',
      cparagraph: '@cparagraph',
      word: '@word',
      cword: '@cword',
    })
    setMockData(data)
  }

  const web = () => {
    const data = Mock.mock({
      url: '@url',
      domain: '@domain',
      email: '@email',
      ip: '@ip',
      tld: '@tld',
      protocol: '@protocol',
    })
    setMockData(data)
  }

  const location = () => {
    const data = Mock.mock({
      region: '@region',
      province: '@province',
      city: '@city',
      county: '@county',
      county_true: '@county(true)',
      county_false: '@county(false)',
      zip: '@zip',
    })
    setMockData(data)
  }

  const random = () => {
    const ranInt = Mock.mock('@integer(1, 10)')
    const ranFloat = Mock.mock('@float(1, 10, 1, 10)')
    const ranBoolean = Mock.mock('@boolean')
    const ranString = Mock.mock('@string(1, 10)')

    const ranObject = {
      name: Mock.mock('@name'),
      age: Mock.mock('@integer(1, 100)'),
      email: Mock.mock('@email'),
      phone: Mock.mock('@phone'),
    }

    const ranArray = Mock.mock({
      'list|1-10': [
        {
          'id|+1': 1, // 从1开始，每次加1
          increment: '@increment', // 自增（全局范围内）
          increment_suffix: '@increment suffix',
          increment_prefix: 'prefix @increment ',
        },
      ],
    })

    // NOTE: 这种是api的写法
    const mockRandom = Mock.Random
    const name = mockRandom.name()
    const age = mockRandom.integer(18, 60)
    const email = mockRandom.email()
    const phone = mockRandom.phone()
    const address = mockRandom.county(true)
    const company = mockRandom.company()
    const website = mockRandom.url()

    setMockData({
      ranInt,
      ranFloat,
      ranBoolean,
      ranString,
      ranObject,
      ranArray,
    })
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl mb-4'>MockJS 示例</h1>
      <div className='space-y-4'>
        <div className='flex gap-2'>
          <Button onClick={simple}>简单数据</Button>
          <Button onClick={image}>图片</Button>
          <Button onClick={date}>日期</Button>
          <Button onClick={color}>颜色</Button>
          <Button onClick={text}>文本</Button>
          <Button onClick={web}>网络</Button>
          <Button onClick={location}>地址</Button>
          <Button onClick={random}>随机</Button>
        </div>
        {mockData && (
          <Card>
            <pre className='whitespace-pre-wrap'>{JSON.stringify(mockData, null, 2)}</pre>
          </Card>
        )}
      </div>
    </div>
  )
}
