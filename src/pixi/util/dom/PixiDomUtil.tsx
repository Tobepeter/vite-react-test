import { Component } from 'react'
import { FileUpload } from './FileUpload'

/**
 * Pixi的一些dom工具
 *
 * NOTE：写成类的形式是因为handle作为闭包会访问很多状态，闭包问题很难去控制
 * 又不希望每次组件渲染使用一个新的handle对象
 */
export class PixiDomUtil extends Component<PixiDomUtilProps, PixiDomUtilState> {
  state: PixiDomUtilState = {
    config: {
      enableUpload: false,
    },
  }

  handle: PixiDomHandle

  componentDidMount() {
    this.handle = {
      setConfig: config => {
        // NOTE: 只会替换部分配置
        const mergedConfig = { ...this.state.config, ...config }
        this.setState({ config: mergedConfig })
      },
      getConfig: () => this.state.config,
    }
    this.props.onHandle?.(this.handle)
  }

  onFileUpload = (file: File) => {
    this.handle?.onFileUpload?.(file)
  }

  render() {
    return <div>{this.state.config.enableUpload && <FileUpload onFileChange={this.onFileUpload} />}</div>
  }
}

export type PixiDomConfig = {
  enableUpload?: boolean
}

export type PixiDomHandle = {
  setConfig: (config: PixiDomConfig) => void
  getConfig: () => PixiDomConfig

  // 为了简化使用，这只是一个callback外面动态赋值的
  onFileUpload?: (file: File) => void
}

export type PixiDomUtilProps = {
  onHandle?: (handle: PixiDomHandle) => void
}

type PixiDomUtilState = {
  config: PixiDomConfig
}
