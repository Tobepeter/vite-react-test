import { Button } from 'antd'
import { create } from 'zustand'

interface Store {
  count: number
  count2: number
}

const useStore = create<Store>(set => ({
  count: 0,
  count2: 0,
}))

export const ZustandSetState = () => {
  const count = useStore(state => state.count)
  const count2 = useStore(state => state.count2)

  // NOTE: 使用 setState 可以不使用快速设置
  const increment = () => useStore.setState({ count: count + 1 })
  // NOTE: 设置是局部设置的，回调函数也是
  // const increment2 = () => useStore.setState({ count2: count2 + 1 })
  const increment2 = () => useStore.setState(state => ({ count2: state.count2 + 1 }))

  return (
    <div>
      <div>计数: {count}</div>
      <div>计数2: {count2}</div>
      <Button onClick={increment}>增加</Button>
      <Button onClick={increment2}>增加2</Button>
    </div>
  )
}
