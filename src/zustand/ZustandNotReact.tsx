import { useMount } from 'ahooks'
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

export const ZustandNotReact = () => {
  useMount(() => {
    const getStoreState = () => useStore.getState()
    const onChange = (state: Store) => {
      console.log('onChange', state)
    }
    const unsubscribe = useStore.subscribe(onChange)
    const timer = setTimeout(() => {
      const store = getStoreState()
      store.increment()
      console.log('store', store)

      // store不是响应式的，每次变化需要重新获取
      // 或者从监听的地方更新
      const newStore = getStoreState()
      console.log('newStore', newStore)
    }, 200)
    return () => {
      unsubscribe()
      clearTimeout(timer)
    }
  })

  return <div></div>
}
