import React from 'react'

const MarginCollapse: React.FC = () => {
  /**
   * 边距塌陷
   *
   * 相邻块级元素的垂直外边距会合并
   * 父子元素之间也会发生外边距塌陷
   * 当父元素没有border、padding、内容或创建新的块格式化上下文时，子元素的margin-top会与父元素的margin-top合并
   * 结果就是子元素的外边距"穿透"了父元素，让整个父元素向下移动
   */

  return (
    <div>
      <div
        style={{
          background: '#f0f0f0',
          height: 500,
        }}
      >
        <div
          style={{
            background: '#e0e0e0',
            marginTop: '20px', // 这里会发生外边距塌陷
          }}
        >
          子元素
        </div>
      </div>
    </div>
  )
}

export default MarginCollapse
