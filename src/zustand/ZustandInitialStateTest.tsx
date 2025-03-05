import { create } from 'zustand'

const initalState = {
  flag: false,
}

type Store = typeof initalState

const store = create<Store>(set => ({
  ...initalState,
}))

export const ZustandInitialStateTest = () => {
  const { flag } = store()
  const divRef = useRef<HTMLDivElement>(null)
  win.divRef = divRef

  /**
   * 初始状态
   *
   * 经过测试，useEffect是异步的
   * 通过 debugger，或者chrome performance 设置 CPU slowdown可以看到
   *
   * 但是如果浏览器很快时候，录屏似乎也不能看到蓝色的状态，不知道什么原因
   */
  useEffect(() => {
    const div = divRef.current
    // if (div) {
    //   debugger
    // }
    store.setState({ flag: true })
  }, [])

  /**
   * useEffect机制
   *
   * useEffect 确实是在浏览器渲染完成后（paint 之后）才执行的
   * 但这里有一个重要的概念叫做"提交阶段"（commit phase）和"渲染阶段"（render phase）。
   *
   * React 18 中引入了并发渲染（concurrent rendering）机制
   * 在某些情况下，React 可能会将多个更新批处理（batch）在一起，导致中间状态不可见
   *
   * 虽然 useEffect 在技术上是在 paint 之后执行，但在现代浏览器和 React 的优化机制下，这个过程可能快到肉眼难以察觉
   */

  console.log('render flag: ', flag)

  return (
    <div>
      <div ref={divRef} className={flag ? 'bg-red-500' : 'bg-blue-500'}>
        {flag ? 'true' : 'false'}
      </div>
    </div>
  )
}
