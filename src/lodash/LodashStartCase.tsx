import { Button } from 'antd'
import { startCase } from 'lodash-es'

export const LodashStartCase = () => {
  const test_startCase = () => {
    /**
     * 结果全都是 大写开头，空格间隔
     */
    let str = ''
    let result = ''

    str = 'test-case'
    result = startCase(str)
    console.log(`${str} -> ${result}`)

    str = 'test_case'
    result = startCase(str)
    console.log(`${str} -> ${result}`)

    str = 'camelCase'
    result = startCase(str)
    console.log(`${str} -> ${result}`)

    str = 'One Two Three'
    result = startCase(str)
    console.log(`${str} -> ${result}`)

    str = 'one two three'
    result = startCase(str)
    console.log(`${str} -> ${result}`)

    str = 'one-two-three'
    result = startCase(str)
    console.log(`${str} -> ${result}`)
  }

  useEffect(() => {
    test_startCase()
  }, [])

  return (
    <div>
      <Button onClick={test_startCase}>test_startCase</Button>
    </div>
  )
}
