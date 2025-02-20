import { Button } from 'antd'
import { create } from 'zustand'

interface Store {
  updateId: number
  count: number
  get countStrWithThis(): string
  get countStr(): string
  increment: () => void
  update: () => void
}

const useStore = create<Store>((set, get) => ({
  updateId: 0,
  count: 0,
  // NOTE: zustand也是基于快照的，使用this是不可靠的，而是用提供的get函数有
  get countStrWithThis() {
    return `count: ${this.count}`
  },
  get countStr() {
    console.log('get countStr')
    return `count: ${get().count}`
  },
  increment: () => set(state => ({ count: state.count + 1 })),
  update: () =>
    set(state => {
      // console.log('set udpate, state: ', state.count, state.countStrWithThis, state.countStr)
      // console.log(get().countStr, state.countStr)
      return { updateId: state.updateId + 1 }
    }),
}))

const useUpdate = () => {
  const updateId = useStore(state => state.updateId)
  const update = useStore(state => state.update)
  return { updateId, update }
}

export const ZustandUpdate = () => {
  const { updateId, update } = useUpdate()
  const countStrWithThis = useStore(state => state.countStrWithThis)
  // 使用 get 无论如何都不能做响应式，这个这个状态不会重新触发get，一直都是一个脏值
  const countStr = useStore(state => state.countStr)
  const increment = useStore(state => state.increment)

  // console.log('countStr', countStr)
  // console.log('updateId', updateId)

  return (
    <div>
      <div>{countStrWithThis}</div>
      <div>{countStr}</div>
      <Button onClick={increment}>增加</Button>
      <Button onClick={update}>更新</Button>
      <Button
        onClick={() => {
          increment()
          update()
        }}
      >
        增加并更新
      </Button>
    </div>
  )
}
