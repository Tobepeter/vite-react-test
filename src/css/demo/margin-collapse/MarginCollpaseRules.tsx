import React from 'react'

const MarginCollapseRules = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>外边距合并的具体规则</h1>

      {/* 规则1：相邻兄弟元素 */}
      <div style={{ border: '2px solid #3498db', padding: '15px', marginBottom: '30px', borderRadius: '8px' }}>
        <h2 style={{ color: '#3498db', marginTop: 0 }}>✅ 规则1：相邻兄弟元素会合并</h2>
        <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
          <div
            style={{
              background: 'rgba(255,0,0,0.2)',
              padding: '10px',
              marginBottom: '30px',
              border: '1px dashed red',
            }}
          >
            第一个div (margin-bottom: 30px)
          </div>
          <div
            style={{
              background: 'rgba(0,255,0,0.2)',
              padding: '10px',
              marginTop: '20px',
              border: '1px dashed green',
            }}
          >
            第二个div (margin-top: 20px)
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          ↑ 实际间距是 max(30px, 20px) = <strong>30px</strong>，不是50px
        </p>
      </div>

      {/* 规则2：父子元素 */}
      <div style={{ border: '2px solid #e74c3c', padding: '15px', marginBottom: '30px', borderRadius: '8px' }}>
        <h2 style={{ color: '#e74c3c', marginTop: 0 }}>⚠️ 规则2：父子元素在特定条件下会合并</h2>

        <h3 style={{ fontSize: '16px', color: '#c0392b' }}>会合并的情况：</h3>
        <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
          <div
            style={{
              background: 'rgba(255,0,0,0.2)',
              padding: '0', // 注意：没有padding
              border: 'none', // 注意：没有border
              marginTop: '0',
            }}
          >
            <div
              style={{
                background: 'rgba(0,255,0,0.2)',
                padding: '10px',
                marginTop: '25px',
                border: '1px dashed green',
              }}
            >
              子元素 (margin-top: 25px)
            </div>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#666' }}>↑ 父元素没有border/padding时，子元素的margin-top会"穿透"父元素</p>

        <h3 style={{ fontSize: '16px', color: '#c0392b' }}>不会合并的情况：</h3>
        <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
          <div
            style={{
              background: 'rgba(255,0,0,0.2)',
              padding: '1px', // 有padding就不会合并
              border: '1px solid red',
            }}
          >
            <div
              style={{
                background: 'rgba(0,255,0,0.2)',
                padding: '10px',
                marginTop: '25px',
                border: '1px dashed green',
              }}
            >
              子元素 (margin-top: 25px)
            </div>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#666' }}>↑ 父元素有border/padding时，子元素的margin正常生效</p>
      </div>

      {/* 规则3：不会合并的情况 */}
      <div style={{ border: '2px solid #f39c12', padding: '15px', marginBottom: '30px', borderRadius: '8px' }}>
        <h2 style={{ color: '#f39c12', marginTop: 0 }}>❌ 不会合并的情况</h2>

        <h3 style={{ fontSize: '16px' }}>1. 浮动元素</h3>
        <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
          <div
            style={{
              background: 'rgba(255,0,0,0.2)',
              padding: '10px',
              marginBottom: '30px',
              float: 'left',
              width: '200px',
              border: '1px dashed red',
            }}
          >
            浮动元素 (margin-bottom: 30px)
          </div>
          <div
            style={{
              background: 'rgba(0,255,0,0.2)',
              padding: '10px',
              marginTop: '20px',
              clear: 'left',
              border: '1px dashed green',
            }}
          >
            普通元素 (margin-top: 20px)
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#666' }}>
          ↑ 浮动元素不参与外边距合并，实际间距是 30px + 20px = <strong>50px</strong>
        </p>

        <h3 style={{ fontSize: '16px' }}>2. 绝对定位元素</h3>
        <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px', marginBottom: '15px', position: 'relative', height: '120px' }}>
          <div
            style={{
              background: 'rgba(255,0,0,0.2)',
              padding: '10px',
              marginBottom: '30px',
              position: 'absolute',
              top: '10px',
              left: '10px',
              border: '1px dashed red',
            }}
          >
            绝对定位 (margin-bottom: 30px)
          </div>
          <div
            style={{
              background: 'rgba(0,255,0,0.2)',
              padding: '10px',
              marginTop: '20px',
              position: 'absolute',
              top: '50px',
              left: '10px',
              border: '1px dashed green',
            }}
          >
            绝对定位 (margin-top: 20px)
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#666' }}>↑ 绝对定位元素不参与外边距合并</p>

        <h3 style={{ fontSize: '16px' }}>3. Flexbox子元素</h3>
        <div
          style={{
            background: '#f8f9fa',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              background: 'rgba(255,0,0,0.2)',
              padding: '10px',
              marginBottom: '30px',
              border: '1px dashed red',
            }}
          >
            Flex子元素 (margin-bottom: 30px)
          </div>
          <div
            style={{
              background: 'rgba(0,255,0,0.2)',
              padding: '10px',
              marginTop: '20px',
              border: '1px dashed green',
            }}
          >
            Flex子元素 (margin-top: 20px)
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#666' }}>
          ↑ Flexbox容器内的子元素不会发生外边距合并，实际间距是 30px + 20px = <strong>50px</strong>
        </p>
      </div>

      {/* 总结 */}
      <div style={{ background: '#e8f5e8', padding: '20px', borderRadius: '8px', border: '2px solid #27ae60' }}>
        <h2 style={{ color: '#27ae60', marginTop: 0 }}>📋 总结：外边距合并的条件</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h3 style={{ color: '#27ae60', fontSize: '16px' }}>✅ 会合并：</h3>
            <ul style={{ fontSize: '14px' }}>
              <li>相邻的块级兄弟元素</li>
              <li>父子元素（父元素无border/padding/内容）</li>
              <li>空的块级元素（自己的margin-top和margin-bottom）</li>
              <li>都是垂直方向的margin</li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: '#e74c3c', fontSize: '16px' }}>❌ 不会合并：</h3>
            <ul style={{ fontSize: '14px' }}>
              <li>浮动元素</li>
              <li>绝对定位元素</li>
              <li>Flexbox/Grid子元素</li>
              <li>有border/padding的元素</li>
              <li>水平方向的margin</li>
              <li>创建了BFC的元素</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarginCollapseRules
