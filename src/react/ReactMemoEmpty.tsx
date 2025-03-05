import { Button } from 'antd'
import { memo } from 'react'

export const ReactMemoEmpty = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Child />
      <MemoChild />
      <Button onClick={() => setCount(count + 1)}>count: {count}</Button>
    </div>
  )
}

const Child = () => {
  // NOTE: 如果没有props，父组件渲染子组件也会渲染的
  console.log('Child render')
  return <div>Child</div>
}

const MemoChild = memo(() => {
  console.log('MemoChild render')
  return <div>MemoChild</div>
})
