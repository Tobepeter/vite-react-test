/**
 * 锁定滚动
 * @desc 测试锁定scrollY的方式来限制苹果的边缘回弹
 */
export const LockScroll = () => {
  // -- config --
  const height = window.innerHeight
  const width = window.innerWidth

  const itemHeight = 500
  const viewportRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const maxScrollY = useRef(0)
  const [displayScrollY, setDisplayScrollY] = useState(0)

  useEffect(() => {
    const bounding = contentRef.current.getBoundingClientRect()
    const contentHeight = bounding.height - bounding.top
    const viewportHeight = viewportRef.current.clientHeight
    maxScrollY.current = contentHeight - viewportHeight
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // NOTE: 经过测试，scrollY是对的，浏览器依然要回弹一下
      if (viewportRef.current.scrollTop > maxScrollY.current) {
        viewportRef.current.scrollTop = maxScrollY.current
      }
      setDisplayScrollY(viewportRef.current.scrollTop)
    }
    viewportRef.current.addEventListener('scroll', handleScroll)

    return () => {
      viewportRef.current.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          zIndex: 1000,
        }}
      >
        ScrollY: {Math.round(displayScrollY)}
      </div>
      <div
        style={{
          height,
          width,
          position: 'relative',
          overflow: 'scroll',
          // scrollBehavior: 'smooth',
        }}
        ref={viewportRef}
      >
        <div ref={contentRef}>
          <div style={{ height: itemHeight, backgroundColor: 'blue' }} />
          <div style={{ height: itemHeight, backgroundColor: 'green' }} />
          <div style={{ height: itemHeight, backgroundColor: 'yellow' }} />
          <div style={{ height: itemHeight, backgroundColor: 'red' }} />
        </div>
      </div>
    </>
  )
}
