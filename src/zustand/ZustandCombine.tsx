import { Button } from 'antd'
import { create } from 'zustand'

interface Store {
  count: number
  count2: number
  setCount: (count: number) => void
  setCount_1: (count: number) => void
  setCount2: (count2: number) => void
}

const useStore = create<Store>(set => ({
  count: 0,
  count2: 0,
  // NOTE: 直接返回一个对象也是可以的，zustand 会自动合并
  setCount: (count: number) => set({ count }),
  setCount_1: (count: number) => set(state => ({ count: state.count + count })),
  setCount2: (count2: number) => set({ count2 }),
}))

export const ZustandCombine = () => {
  const count = useStore(state => state.count)
  const count2 = useStore(state => state.count2)
  const setCount = useStore(state => state.setCount)
  const setCount2 = useStore(state => state.setCount2)
  const setCount_1 = useStore(state => state.setCount_1)
  return (
    <div>
      <div>count: {count}</div>
      <div>count2: {count2}</div>
      <Button onClick={() => setCount(count + 1)}>setCount</Button>
      <Button onClick={() => setCount_1(1)}>setCount_1</Button>
      <Button onClick={() => setCount2(count2 + 1)}>setCount2</Button>
    </div>
  )
}
