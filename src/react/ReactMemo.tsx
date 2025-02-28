import { Button, Space, Typography } from 'antd'
import React from 'react'
import { memo, useState } from 'react'

const { Title } = Typography

/**
 * memo测试
 *
 * 注意父组件的 setState 需要产生变化，父组件才会渲染
 * 子组件无论是prop是否变化，都会重新渲染，除非设置了 memo 包裹
 *
 * Q：什么时候应该使用memo？
 * 1. 组件渲染开销比较大的时候
 *
 * 不建议用的场景
 * 1. 消费了 context
 * 2. 渲染成本很低的简单组件，memo 的比较成本可能超过重新渲染的成本
 * 3. 组件几乎总是接收不同的 props
 *
 */
export const ReactMemo = () => {
  const [msg, setMsg] = useState('hello')
  const [count, setCount] = useState(0)
  console.log('父组件渲染')

  return (
    <Space direction="vertical" size="large">
      <Title level={2}>React.memo 示例</Title>

      <Space direction="vertical">
        <MemoChild msg={msg} />
        <NomralChild msg={msg} />
        <Button onClick={() => setMsg('hello')}>hello</Button>
        <Button onClick={() => setMsg('world')}>world</Button>
        <Button onClick={() => setCount(count + 1)}>count: {count}</Button>
      </Space>
    </Space>
  )
}

const MemoChild = memo(({ msg }: { msg: string }) => {
  console.log('MemoChild 组件渲染')
  return <div>MemoChild msg: {msg}</div>
})

const NomralChild = ({ msg }: { msg: string }) => {
  console.log('NormalChilds 组件渲染')
  return <div>NormalChilds msg: {msg}</div>
}

/** -----猜测 memo 的实现原理 ----- */
const myMemo = (Component: React.ComponentType<any>) => {
  return class MemoComponent extends React.Component<any> {
    // NOTE：函数组件没有这个行为，之后类组件可以控制条件渲染，除非是内部实习那了
    shouldComponentUpdate(nextProps: any) {
      // 浅比较所有的 props
      const currentProps = this.props
      for (const key in currentProps) {
        if (currentProps[key] !== nextProps[key]) {
          return true // props 发生变化，需要更新
        }
      }
      for (const key in nextProps) {
        if (!(key in currentProps)) {
          return true // 新增了 props，需要更新
        }
      }
      return false // props 没有变化，不需要更新
    }

    render() {
      return <Component {...this.props} />
    }
  }
}
