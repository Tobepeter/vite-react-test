import { Button } from 'antd'
import { create } from 'zustand'
import { shallow } from 'zustand/shallow'
import { useShallow } from 'zustand/shallow'

interface Store {
  count1: number
  count2: number
  changeCount1: (count1: number) => void
  changeCount2: (count2: number) => void
}

const useStore = create<Store>(set => ({
  count1: 1,
  count2: 2,
  changeCount1: (count1: number) => set(state => ({ count1 })),
  changeCount2: (count2: number) => set(state => ({ count2 })),
}))

export const ZustandShallow = () => {
  // NOTE: 如果返回对象，必须使用浅层比较，必然控制台会有警告
  //  Warning: The result of getSnapshot should be cached to avoid an infinite loop
  // 老的版本，支持在 usStore 传递一个 shallow 的 middleware, v5 似乎不支持了
  const { count1, count2 } = useStore(useShallow(state => ({ count1: state.count1, count2: state.count2 })))

  const changeCount1 = useStore(state => state.changeCount1)
  const changeCount2 = useStore(state => state.changeCount2)

  return (
    <div>
      <div>count1: {count1}</div>
      <div>count2: {count2}</div>
      <Button onClick={() => changeCount1(count1)}>写入store，不改变count1</Button>
      <Button onClick={() => changeCount2(count2)}>写入store，不改变count2</Button>
    </div>
  )
}
