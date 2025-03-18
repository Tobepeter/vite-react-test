import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

export const StyledCompBasic = () => {
  /**
   * 构建分析
   *
   * 构建后，使用一个class，但是这个class是一个带有哈希的
   * 比如 sc-blHHSb fwsnNR
   *
   * 实际上，经过查阅，styled-components 是运行时解析的
   * 性能会有折扣
   * 与预编译的 CSS 相比，可能会导致首屏渲染稍慢
   */

  /**
   * hmr
   *
   * 貌似 hmr 不支持
   * 每次修改都会刷新浏览器
   *
   * 可以试试颜色，可以看到控制台刷新了，说明加载了
   */
  // 基础样式组件
  const Button = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  `

  // 基于 props 的条件样式
  const FlexContainer = styled.div<{ direction?: 'row' | 'column' }>`
    display: flex;
    flex-direction: ${props => props.direction || 'row'};
    gap: 10px;
    padding: 20px;
  `

  // 继承样式
  const PrimaryButton = styled(Button)`
    background-color: #2196f3;

    &:hover {
      background-color: #1976d2;
    }
  `
  // 使用全局样式
  const GlobalStyle = createGlobalStyle`
    body {
      background-color: red;
    }
  `

  return (
    <div>
      <Button />
      <FlexContainer direction="column" />
      <PrimaryButton />
      <GlobalStyle />
    </div>
  )
}
