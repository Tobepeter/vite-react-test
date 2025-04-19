import React from 'react'
import './ScssSimple.scss'

export const ScssSimple: React.FC = () => {
  return (
    <div className='container'>
      <div className='header'>
        <h1>SCSS 样式演示</h1>
      </div>

      <div className='content'>
        <div className='card'>
          <h2 className='card-title'>卡片 1</h2>
          <p className='card-content'>这是一个使用 SCSS 样式的卡片组件。展示了变量使用、嵌套语法等特性。</p>
          <button className='button-primary'>主要按钮</button>
        </div>

        <div className='card'>
          <h2 className='card-title'>卡片 2</h2>
          <p className='card-content'>这个卡片展示了 SCSS 的 mixin 功能，比如按钮样式的复用。</p>
          <button className='button-secondary'>次要按钮</button>
        </div>

        <div className='card'>
          <h2 className='card-title'>卡片 3</h2>
          <p className='card-content'>响应式设计已经通过 media queries 实现，请尝试调整窗口大小。</p>
          <button className='button-primary'>了解更多</button>
        </div>
      </div>
    </div>
  )
}
