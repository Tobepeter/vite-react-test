import './LockOrientationDemo.css'

/**
 * 竖屏锁定测试
 *
 * 貌似没有很好的做法
 * @link https://stackoverflow.com/questions/38359782/how-to-lock-viewport-to-portrait-orientation-in-html5-css3
 *
 * 旋转了90度，比如游戏算innerWidth就会错了
 */
export const LockOrientationDemo = () => {
  const addMetaTag = () => {
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, orientation=portrait'
    document.head.appendChild(meta)
  }

  useEffect(() => {
    // addMetaTag()
  }, [])

  return <div className='w-full h-full bg-red-500'>LockOrientationDemo</div>
}
