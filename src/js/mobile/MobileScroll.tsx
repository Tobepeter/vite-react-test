/**
 * 移动端滚动
 *
 * 经过测试，不仅仅支持双指滚动（pc的触摸板）
 * 也是支持单指滚动的（移动端的行为）
 *
 * 特殊测试了一下pc模式，pc模式仅支持滚动
 * 不支持点按模式
 */
export const MobileScroll = () => {
  // rgb色块垂直滚动
  const [scrollTop, setScrollTop] = useState(0)
  const [rgbList, setRgbList] = useState<string[]>([])

  useEffect(() => {
    const count = 10
    const list = Array.from({ length: count }, () => {
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      return `rgb(${r},${g},${b})`
    })
    setRgbList(list)
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  return (
    <div
      className="mobile-scroll"
      style={{
        height: 300,
        width: 200,
        overflow: 'scroll',
      }}
      onScroll={handleScroll}
    >
      {rgbList.map((color, index) => (
        <div
          key={index}
          style={{
            height: '100px',
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          {index + 1}
        </div>
      ))}
    </div>
  )
}
