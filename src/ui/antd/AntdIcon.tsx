import { SmileOutlined } from '@ant-design/icons'

export const AntdIcon = () => {
  /**
   * 颜色控制
   *
   * 默认 svg 里面是 fill="currentColor"
   * 所以可以通过 style={{ color: 'red' }} 来控制颜色
   *
   * 如果通过 image src 是无法控制的
   */
  return <SmileOutlined style={{ fontSize: '100px', color: 'red' }} />
}
