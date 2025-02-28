import { useState } from 'react'
import safeAreaInsets from 'safe-area-insets'

/**
 * 响应式测试
 *
 * 可以通过旋转屏幕来实现
 */
export const SafeAreaInsetsReactive = () => {
  const [message, setMessage] = useState('hello')
  const [insets, setInsets] = useState(safeAreaInsets)

  insets.onChange(() => {
    setInsets(safeAreaInsets)
    setMessage('change' + safeAreaInsets.left)
  })

  return (
    <div className="h-screen w-screen bg-black relative">
      {/* 信息展示 */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
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
        <div>信息：{message}</div>
      </div>

      {/* 方便进行滚动 */}
      {/* <div className="bg-red-500 h-[2000px]"></div> */}

      {/* 顶部 */}
      <div
        className="absolute top-0 w-full bg-red-500"
        style={{
          height: insets.top,
        }}
      ></div>

      {/* 底部 */}
      <div
        className="absolute bottom-0 w-full bg-blue-500"
        style={{
          height: insets.bottom,
        }}
      ></div>

      {/* 左侧 */}
      <div
        className="absolute left-0 h-full bg-green-500"
        style={{
          width: insets.left,
        }}
      ></div>

      {/* 右侧 */}
      <div
        className="absolute right-0 h-full bg-yellow-500"
        style={{
          width: insets.right,
        }}
      ></div>
    </div>
  )
}
