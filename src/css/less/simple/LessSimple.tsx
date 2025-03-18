import React from 'react'
import './LessSimple.less'

export const LessSimple: React.FC = () => {
  const features = ['Less 变量使用', 'Mixins（混合器）', '嵌套规则', '运算功能', '颜色函数', '父选择器引用']

  return (
    <div className="less-demo">
      <div className="header">
        <h1>Less 样式示例</h1>
        <p>这是一个展示 Less 主要特性的示例</p>
      </div>

      <div className="button-group">
        <button className="primary-button">主要按钮</button>
        <button className="secondary-button">次要按钮</button>
      </div>

      <div className="feature-list">
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
