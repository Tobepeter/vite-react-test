/**
 * 固定宽高比测试
 *
 * 关于aspectRatio
 * @link https://caniuse.com/?search=aspectRatio
 * 目前兼容性很差，几乎不用考虑了
 */
export const AspectRatio = () => {
  const wrapperStyle: React.CSSProperties = {
    width: '100%',
    height: '800px',
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  }

  const contentStyle: React.CSSProperties = {
    width: '100%',
    // NOTE: 中间是否有空格都是可以的（有多个，不对称都可以）
    // aspectRatio: '16/9',
    aspectRatio: '16 / 9',
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
  }

  return (
    <div style={wrapperStyle}>
      <div style={contentStyle}></div>
    </div>
  )
}
