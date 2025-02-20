import { Button } from 'antd'
import { create } from 'zustand'

interface Store {
  count: number
  get countStr()
  increment: () => void
}

const useStore = create<Store>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  get countStr() {
    return `count: ${this.count}`
  },
}))

export const ZustandGetter = () => {
  // NOTE: getter无响应式
  //  因为 Zustand 的 store 本质上是一个普通的 JavaScript 对象，不像 Vue 那样内置了响应式系统

  const countStr = useStore(state => state.countStr)
  const increment = useStore(state => state.increment)

  return (
    <div>
      <div>{countStr}</div>
      <Button onClick={increment}>增加</Button>
    </div>
  )
}
