import { Button } from 'antd'
import { Component } from 'react'

/**
 * 测试 React 组件的挂载顺序
 *
 * 挂载：
 * 1. 子节点优先挂载
 * 2. 同层级类组件优先（很奇怪）
 * 3. 同层级同类型，按照顺序挂载
 *
 * 子组件优先挂载很重要，因为我们逻辑上通常要拿到子组件的ref来操作
 * 这个也是符合逻辑的，父组件开始执行逻辑时候，应该子对象就绪的
 *
 * 卸载：
 * 1. 子节点类，类组件优先 willUnmount
 * 2. 然后是父组件 willUnmount
 * 3. 最后是子组件函数组件 willUnmount
 *
 * 这个顺序很绕，类组件还有点不一样
 *
 */
export const ReactMountedOrder = () => {
  const [show, setShow] = useState(true)

  const ReactChild = ({ name }: { name: string }) => {
    useEffect(() => {
      console.log(`ReactChild ${name} didMount`)
      return () => {
        console.log(`ReactChild ${name} willUnmount`)
      }
    }, [])
    return <div>ReactChild {name}</div>
  }

  class ReactChildClass extends Component {
    // NOTE: 即使是类组件，也是支持的，顺序是倒序的
    componentDidMount() {
      console.log('ReactChildClass didMount')
    }

    componentWillUnmount() {
      console.log('ReactChildClass willUnmount')
    }

    render() {
      return <div>ReactChildClass</div>
    }
  }

  const ReactParent = () => {
    useEffect(() => {
      console.log('ReactParent didMount')
      return () => {
        console.log('ReactParent willUnmount')
      }
    }, [])

    return (
      <div>
        <ReactChild name="child1" />
        <ReactChildClass />
        <ReactChild name="child2" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {show && <ReactParent />}
      <Button onClick={() => setShow(!show)}>Toggle</Button>
    </div>
  )
}
