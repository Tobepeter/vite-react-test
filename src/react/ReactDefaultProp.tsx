import { Component } from 'react'

export const ReactDefaultProp = () => {
  class ClsComp extends Component {
    static defaultProps = {
      name: 'default',
    }

    componentDidMount() {
      console.log('ClsComp', this.props)
    }

    render() {
      return <div>ReactDefaultProp</div>
    }
  }

  function FuncComp(props: any) {
    console.log('FuncComp', props)
    return <div>FuncComp</div>
  }

  // NOTE: 目前已经不支持了
  // Warning:
  //  Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.
  // React 18中，函数组件的 defaultProps 特性已被弃用
  // 官方建议使用解构赋值默认值
  function addFuncDefaultProps() {
    // @ts-ignore
    FuncComp.defaultProps = {
      name: 'default',
    }
  }
  // addFuncDefaultProps()

  return (
    <>
      <ClsComp />
      ``
      <FuncComp />
    </>
  )
}
