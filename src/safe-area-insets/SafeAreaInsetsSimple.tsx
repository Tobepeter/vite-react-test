import safeAreaInsets from 'safe-area-insets'

/**
 * 安全区域
 *
 * 为什么会有左右侧
 * - 在手机横屏模式下，如果是刘海屏/打孔屏设备，刘海/打孔可能会出现在右侧
 * - 某些特殊形状的设备（如圆角屏幕、瀑布屏等）可能在右侧边缘有不规则的显示区域
 * - 某些设备在特定情况下可能在右侧有系统级的界面元素（如分屏时的分割线、快捷操作栏等）
 */
export const SafeAreaInsetsSimple = () => {
  const insets = safeAreaInsets

  return (
    <div
      style={{
        padding: `${insets.top}px ${insets.right}px ${insets.bottom}px ${insets.left}px`,
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        <div>顶部安全区域: {insets.top}px</div>
        <div>底部安全区域: {insets.bottom}px</div>
        <div>左侧安全区域: {insets.left}px</div>
        <div>右侧安全区域: {insets.right}px</div>
      </div>
    </div>
  )
}
