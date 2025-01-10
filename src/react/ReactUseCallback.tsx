import { useCallback, useState } from 'react'
import { Button } from 'antd'

export const ReactUseCallback = () => {
  const [count, setCount] = useState(0)

  const printCount = useCallback(() => {
    console.log(count)
  }, [count])

  const printCountSimple = () => {
    console.log(count)
  }

  const addCount = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 't') {
        // NOTE：经过测试，useCallback 只是解决脏渲染，并不会响应state变化而更新函数地址
        console.log('printCount')
        printCount()

        console.log('printCountSimple')
        printCountSimple()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }

    // NOTE：故意这么设计的，就是想试试，永远使用闭包第一个的指针会出什么问题
  }, [])

  return (
    <div>
      <div>count: {count}</div>
      <Button onClick={addCount}>add</Button>
      <Button onClick={printCount}>printCount</Button>
      <Button onClick={printCountSimple}>printCountSimple</Button>
    </div>
  )
}
