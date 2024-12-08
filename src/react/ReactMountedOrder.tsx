import { Component } from 'react'

/**
 * 测试 React 组件的挂载顺序
 *
 * 1. 子节点优先挂载
 * 2. 同层级，后者先挂载
 *
 * @desc 这个逻辑很重要，因为我们经常需要拿到child的ref，去进行操作
 */
export const ReactMountedOrder = () => {
  useEffect(() => {
    console.log('ReactMountedOrder useEffect')
  }, [])

  // NOTE: 经过测试，是 child 先执行的
  const ReactChild = () => {
    useEffect(() => {
      console.log('ReactChild useEffect')
    }, [])
    return <div>ReactChild</div>
  }

  class ReactChildClass extends Component {
    // NOTE: 即使是类组件，也是支持的，顺序是倒序的
    componentDidMount() {
      console.log('ReactChildClass componentDidMount')
    }

    render() {
      return <div>ReactChildClass</div>
    }
  }

  return (
    <div>
      <ReactChild />
      <ReactChildClass />
    </div>
  )
}
