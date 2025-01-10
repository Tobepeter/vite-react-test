/**
 * 测试移动端拉起键盘
 *
 * 经过测试，safari拉起键盘确实会影响到视口的宽度，并且不会触发resize事件
 */
export const MobileInputTest = () => {
  const [data, setData] = useState({
    // innerWidth: 0,
    innerHeight: 0,
    // screenHeight: 0,
    // screenWidth: 0,
    // visualWidth: 0,
    // visualHeight: 0,
  })

  const onResize = () => {
    setData({
      // innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,

      // NOTE: screenHeight 是整个屏幕的，导航条也算进去了
      // screenHeight: window.screen.height,
      // screenWidth: window.screen.width,

      // visualWidth: window.visualViewport?.width,
      // visualHeight: window.visualViewport?.height,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)
    onResize()

    const timerId = setInterval(() => {
      onResize()
    }, 16)

    return () => {
      window.removeEventListener('resize', onResize)
      clearInterval(timerId)
    }
  }, [])

  return (
    <div>
      <div className="fixed bottom-10 right-10">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <span>{key}: </span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <input className="fixed bottom-10 border-2 border-red-500" type="text" placeholder="请输入" />
    </div>
  )
}
