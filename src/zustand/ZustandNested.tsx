import { Button } from 'antd'
import { create } from 'zustand'

interface Store {
  nested: {
    count: number
    count1: number
  }
  count2: number
  setNested: (nested: Store['nested']) => void
  setNestedPart: (nested: Partial<Store['nested']>) => void
  // setNestedPart2: (nested: Partial<Store['nested']>) => void
  setCount2: (count2: number) => void
}

const useStore = create<Store>(set => ({
  nested: { count: 0, count1: 0 },
  count2: 0,
  setNested: (nested: Store['nested']) => set({ nested }),
  setNestedPart: (nested: Partial<Store['nested']>) => set(state => ({ nested: { ...state.nested, ...nested } })),

  // NOTE: 子节点不支持局部设置，一定是替换关系的，如果给一个{}，也是替换了
  // setNestedPart2: (nested: Partial<Store['nested']>) => set({ nested: { ...nested } }),
  setCount2: (count2: number) => set({ count2 }),
}))

export const ZustandNested = () => {
  // NOTE：直接导出对象也是可以的，因为对象是在 state 上的，如果自己造一个对象要使用 useShallow
  const nested = useStore(state => state.nested)
  const count2 = useStore(state => state.count2)
  const setNested = useStore(state => state.setNested)

  // NOTE: 哪怕是返回的是子对象上的，子对象也会只能合并
  const setNestedPart = useStore(state => state.setNestedPart)
  const setCount2 = useStore(state => state.setCount2)

  return (
    <div>
      <div>nested: {nested.count}</div>
      <div>nested1: {nested.count1}</div>
      <div>count2: {count2}</div>
      <Button onClick={() => setNested({ count: nested.count + 1, count1: nested.count1 + 1 })}>setNested</Button>
      <Button onClick={() => setNestedPart({ count: nested.count + 1 })}>setNestedPart</Button>
      <Button onClick={() => setCount2(count2 + 1)}>setCount2</Button>
    </div>
  )
}
