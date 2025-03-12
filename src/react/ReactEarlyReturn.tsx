import { Button } from 'antd'
import { useState, useEffect } from 'react'

export const ReactEarlyReturn = () => {
  /**
   * 父组件条件渲染vs子组件条件渲染
   *
   * 子组件条件适合控制逻辑比较复杂，由于子组件进行控制的
   *
   * 如果子组件控制渲染，状态是保留的，比如计时器
   * 如果子组件的state比较多，可以考虑额外进行包装
   */
  const [show, setShow] = useState(false)

  return (
    <div>
      <Button onClick={() => setShow(!show)}>Toggle</Button>
      <Component show={show} />
    </div>
  )
}

const Component: React.FC<{ show: boolean }> = ({ show }) => {
  /**
   * 顶层early return
   *
   * 会有warning
   * Warning: Internal React error: Expected static flag was missing. Please notify the React team.
   *
   * 说明react的一个组件必须是确定的
   */
  // if (!show) return null

  const [count, setCount] = useState(0)

  const startCount = () => {
    setInterval(() => {
      setCount(prevCount => prevCount + 1)
    }, 1000)
  }

  useEffect(() => {
    startCount()
  }, [])

  // if (!show) return null

  return <div>{count}</div>
}
