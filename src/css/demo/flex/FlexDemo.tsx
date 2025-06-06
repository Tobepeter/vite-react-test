function FlexSimple() {
  /**
   * flex-grow
   *
   * 使用grow之后，会忽略设定的宽度，根据grow的值来分配剩余空间
   */

  // const flexGrowWidth = '50px'
  const flexGrowWidth = 'unset'

  /**
   * flex-basis
   *
   * 假设宽度
   * flex简单来说就是排版了所有确定的宽度
   * 最后多余或者不足的宽度，会根据flex-grow和flex-shrink来分配
   */

  return (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      {/* flex-grow 示例 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3>flex-grow 示例</h3>
        <div style={{ display: 'flex', width: '300px', border: '1px solid #ccc' }}>
          <div style={{ width: flexGrowWidth, flexGrow: 1, background: '#ffcdd2', padding: '10px', textAlign: 'center' }}>1</div>
          <div style={{ width: flexGrowWidth, flexGrow: 2, background: '#c8e6c9', padding: '10px', textAlign: 'center' }}>2</div>
          <div style={{ width: flexGrowWidth, flexGrow: 3, background: '#bbdefb', padding: '10px', textAlign: 'center' }}>3</div>
        </div>
      </div>

      {/* flex-shrink 示例 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3>flex-shrink 示例</h3>
        <div style={{ display: 'flex', width: '300px', border: '1px solid #ccc' }}>
          <div style={{ width: '200px', flexShrink: 1, background: '#ffcdd2', padding: '10px' }}>flex-shrink: 1</div>
          <div style={{ width: '200px', flexShrink: 2, background: '#c8e6c9', padding: '10px' }}>flex-shrink: 2</div>
          <div style={{ width: '200px', flexShrink: 3, background: '#bbdefb', padding: '10px' }}>flex-shrink: 3</div>
        </div>
      </div>

      {/* flex-basis 示例 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3>flex-basis 示例</h3>
        <div style={{ display: 'flex', width: '300px', border: '1px solid #ccc' }}>
          <div style={{ flexBasis: '50px', background: '#ffcdd2', padding: '10px' }}>flex-basis: 50px</div>
          <div style={{ flexBasis: '100px', background: '#c8e6c9', padding: '10px' }}>flex-basis: 100px</div>
          <div style={{ flexBasis: 'unset', background: '#bbdefb', padding: '10px' }}>flex-basis: unset</div>
        </div>
      </div>
    </div>
  )
}

function FlexNoGrow() {
  // 如果没人grow，那么是允许留白的
  return (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <h3>flex-grow: 0</h3>
      <div style={{ display: 'flex', width: '300px', border: '1px solid #ccc' }}>
        <div style={{ width: '50px', flexGrow: 0, background: '#ffcdd2', padding: '10px', textAlign: 'center' }}>1</div>
        <div style={{ width: '50px', flexGrow: 0, background: '#c8e6c9', padding: '10px', textAlign: 'center' }}>2</div>
        <div style={{ width: '50px', flexGrow: 0, background: '#bbdefb', padding: '10px', textAlign: 'center' }}>3</div>
      </div>
    </div>
  )
}

function FlexNoShrink() {
  // 如果没人shrink，那么是允许溢出的
  const width = '300px'
  return (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <h3>flex-shrink: 0</h3>
      <div style={{ display: 'flex', width, border: '1px solid #ccc' }}>
        <div style={{ width: '200px', flexShrink: 0, background: '#ffcdd2', padding: '10px' }}>flex-shrink: 0</div>
        <div style={{ width: '200px', flexShrink: 0, background: '#c8e6c9', padding: '10px' }}>flex-shrink: 0</div>
        <div style={{ width: '200px', flexShrink: 0, background: '#bbdefb', padding: '10px' }}>flex-shrink: 0 {width}</div>
      </div>

      <div>
        <div>宽度：{width}</div>
        <div style={{ width, height: '20px', background: '#ddd' }}></div>
      </div>
    </div>
  )
}

export default function FlexDemo() {
  // return <FlexSimple />
  // return <FlexNoGrow />
  return <FlexNoShrink />
}
