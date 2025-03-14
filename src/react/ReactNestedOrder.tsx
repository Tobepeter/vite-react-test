import { Button } from 'antd'
import { PropsWithChildren } from 'react'

/**
 * 父子组件顺序测试
 *
 * [渲染顺序]
 * 父组件先创建并执行，然后子组件
 *
 * [挂载顺序]
 * 子组件先挂载
 *
 * [即将卸载顺序]
 * 父组件先即将卸载
 * 然后是子组件
 */
export const ReactNestedOrder = () => {
  const [show, setShow] = useState(true)

  return (
    <div>
      <Button onClick={() => setShow(!show)}>Toggle</Button>
      {show && (
        <Nested1>
          <Nested2 />
        </Nested1>
      )}
    </div>
  )
}

const Nested1: PropsWithChildren<any> = ({ children }) => {
  console.log('Nested1 render')

  useEffect(() => {
    console.log('Nested1 didMount')
    return () => {
      console.log('Nested1 willUnmount')
    }
  }, [])
  return (
    <div>
      <div>Nested1</div>
      <div>{children}</div>
    </div>
  )
}

const Nested2 = () => {
  console.log('Nested2 render')

  useEffect(() => {
    console.log('Nested2 didMount')
    return () => {
      console.log('Nested2 willUnmount')
    }
  }, [])

  return <div>Nested2</div>
}
