import { extend } from 'lodash-es'
import { Component, createContext } from 'react'

/**
 * 测试 React Context
 *
 * 类组件可以通过声明静态的 contextType 来获取 Context
 * 但是类组件废弃了 contextTypes，目前只能使用一个 contextType
 * 如果想要多个，只能拆开多个组件，或者使用 Context.Consumer 来获取
 *
 * 函数组件可以通过 useContext 来获取 Context，支持多个
 */
export const ReactContextTest = () => {
  const MyContext = createContext<{ name?: string }>({ name: 'context' })
  const MyContext2 = createContext<{ name?: string }>({ name: 'context2' })

  class MyCls extends Component {
    static contextType = MyContext

    componentDidMount() {
      console.log('MyCls', this.context)
    }

    render() {
      return <div>MyCls</div>
    }
  }

  class MyClsMulti extends Component {
    render() {
      return (
        <>
          <MyContext.Consumer>{value => <div>{value.name}</div>}</MyContext.Consumer>
          <MyContext2.Consumer>{value => <div>{value.name}</div>}</MyContext2.Consumer>
        </>
      )
    }
  }

  return (
    <MyContext.Provider value={{}}>
      <MyContext2.Provider value={{}}>
        <MyCls />
      </MyContext2.Provider>
    </MyContext.Provider>
  )
}
