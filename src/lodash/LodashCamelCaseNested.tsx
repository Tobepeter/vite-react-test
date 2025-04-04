import { Button } from 'antd'
import { camelCase, isObject, mapKeys, snakeCase } from 'lodash-es'

export const LodashCamelCaseNested = () => {
  const test_simple = () => {
    const str = 'test-case'
    const result = str.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
    console.log(result)
  }

  const test_lodash = () => {
    const str = 'test-case'
    const result = camelCase(str)
    console.log(result)
  }

  // common code
  function transformKey<T extends any>(obj: T, transform: (key: string) => string): T {
    if (Array.isArray(obj)) return obj.map(item => transformKey(item, transform)) as T

    if (isObject(obj)) {
      const newObj = {}
      Object.keys(obj).forEach(key => {
        newObj[transform(key)] = transformKey(obj[key], transform)
      })
      return newObj as T
    }

    return obj
  }

  function snakeToCamel<T extends any>(obj: T): T {
    return transformKey(obj, snakeCase)
  }

  const test_snakeToCamel = () => {
    const obj = {
      snake_case1: 'snake_case1',
      snake_case2: {
        snake_case3: 'snake_case3',
      },
      snake_case4: [
        'snake_case4',
        {
          snake_case5: 'snake_case5',
        },
      ],
    }
    const result = snakeToCamel(obj)
    console.log(result)
  }

  function camelToSnake<T extends any>(obj: T): T {
    return transformKey(obj, camelCase)
  }

  const test_camelToSnake = () => {
    const obj = {
      camelCase1: 'camelCase1',
      camelCase2: {
        camelCase3: 'camelCase3',
      },
      camelCase4: [
        'camelCase4',
        {
          camelCase5: 'camelCase5',
        },
      ],
    }
    const result = camelToSnake(obj)
    console.log(result)
  }

  return (
    <div>
      <Button onClick={test_simple}>test_simple</Button>
      <Button onClick={test_lodash}>test_lodash</Button>
      <Button onClick={test_snakeToCamel}>test_snakeToCamel</Button>
      <Button onClick={test_camelToSnake}>test_camelToSnake</Button>
    </div>
  )
}
