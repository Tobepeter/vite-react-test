import { useEffect } from 'react'
import mitt from 'mitt'

export const MittDemo = () => {
  /**
   * 重复监听测试
   *
   * 经过测试，不会覆盖之前的监听，会打印两次
   */
  const test_multi_listen = () => {
    const print = () => {
      console.log('print')
    }

    const emitter = mitt()
    emitter.on('test', print)
    emitter.on('test', print)
    emitter.emit('test', 'test')
  }

  useEffect(() => {
    test_multi_listen()
  }, [])

  return <div>MittDemo</div>
}
