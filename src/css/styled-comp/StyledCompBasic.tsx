import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

export const StyledCompBasic = () => {
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
    background-color: red
  }
`

  return (
    <div>
      <Button />
      <FlexContainer />
      <PrimaryButton />
      <GlobalStyle />
    </div>
  )
}
