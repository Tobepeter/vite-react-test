import MarginCollapseRules from './MarginCollpaseRules'

const MarginDemo: React.FC = () => {
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

const MarginCollapaseExplain: React.FC = () => {
  /**
   * 外边距合并（Margin Collapse）
   *
   * 是CSS故意设计的特性
   *
   * CSS最初是为了文档排版而设计的，特别是类似报纸、杂志这样的传统印刷媒体
   *
   * 1. CSS诞生于1996年
   * 那时的网页主要是文档，不是应用
   * 主要用途：学术论文、新闻文章、博客
   * 排版需求类似传统印刷媒体
   *
   * 2. 设计者希望这样写CSS：
   * h1 { margin-bottom: 20px; }
   * p { margin-top: 10px; }
   *
   * 3. 但只是希望取最大值
   */

  const refHeight = 30

  return (
    <div>
      <div style={{ overflow: 'hidden' }}>
        {' '}
        {/* 创建BFC，防止外边距塌陷 */}
        <h1 style={{ marginBottom: '20px', background: '#FF6B6B', margin: '0 0 20px 0' }}>h1</h1>
        <p style={{ marginTop: '10px', background: '#4ECDC4', margin: '10px 0 0 0' }}>p</p>
      </div>

      <div style={{ position: 'absolute', top: 24, right: 10 }}>
        <div style={{ background: 'oklch(62.7% 0.265 303.9)', width: 100, height: refHeight, color: 'white', textAlign: 'center', lineHeight: `${refHeight}px` }}>高度{refHeight}</div>
      </div>
    </div>
  )
}

export default function MarginCollapse() {
  return (
    <div>
      {/* <MarginDemo /> */}
      {/* <MarginCollapaseExplain /> */}
      <MarginCollapseRules />
    </div>
  )
}
