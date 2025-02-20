import { Button } from 'antd'
import { create } from 'zustand'

interface Store {
  count: number
  count2: number
  increment: () => void
}

const useStore = create<Store>(set => ({
  count: 0,
  count2: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}))

export const ZustandStateDiff = () => {
  // NOTE: useStore 类似创建了一个局部的state
  //  但是会监听store的变化进行更改
  //  所以不用担心store其他不相干的状态变化导致重渲染
  const count2 = useStore(state => state.count2)
  const increment = useStore(state => state.increment)
  const renderCount = useRef(0)

  return (
    <div>
      <div>计数2: {count2}</div>
      <div>渲染次数: {renderCount.current}</div>
      <Button onClick={increment}>增加</Button>
    </div>
  )
}
