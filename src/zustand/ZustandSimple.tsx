import { Button } from 'antd'
import { create } from 'zustand'

interface Store {
  count: number
  increment: () => void
}

const useStore = create<Store>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}))

export const ZustandSimple = () => {
  const count = useStore(state => state.count)

  // NOTE：其实 zustand 没有 redux 区分 actions，其实这就是store上的一个变量
  const increment = useStore(state => state.increment)

  return (
    <div>
      <div>计数: {count}</div>
      <Button onClick={increment}>增加</Button>
    </div>
  )
}
