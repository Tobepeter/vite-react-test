/**
 * 固定宽高比JS
 */
export const AspectRatioJS = () => {
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
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
  }

  const contentRef = useRef<HTMLDivElement>(null)
  const updateContentHeight = () => {
    const ratio = 1920 / 1080
    const content = contentRef.current

    if (content) {
      const width = content.offsetWidth
      const height = width / ratio
      content.style.height = `${height}px`
    }
  }

  useEffect(() => {
    updateContentHeight()

    window.addEventListener('resize', updateContentHeight)
    return () => {
      window.removeEventListener('resize', updateContentHeight)
    }
  }, [])

  return (
    <div style={wrapperStyle}>
      <div style={contentStyle} ref={contentRef} />
    </div>
  )
}
