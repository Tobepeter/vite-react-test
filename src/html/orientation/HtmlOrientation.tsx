export const HtmlOrientation = () => {
  const testResize = false
  const testScreenOrientation = true

  /**
   * -- 测试结果 --
   *
   * resize 无论是旋转还是修改窗口大小都会触发
   * orientationchange 只有旋转才会触发
   *
   * orientationchnage 只有pc转mobile会触发，mobile转pc不会触发
   * mobile自己旋转也会触发 resize 和 orientationchange
   *
   */
  useEffect(() => {
    if (!testResize) return

    let resizeCb: () => void
    let orientationCb: () => void

    window.addEventListener(
      'resize',
      (resizeCb = () => {
        console.log('resize')
      })
    )

    window.addEventListener(
      'orientationchange',
      (orientationCb = () => {
        console.log('orientationchange')
      })
    )

    return () => {
      window.removeEventListener('resize', resizeCb)
      window.removeEventListener('orientationchange', orientationCb)
    }
  }, [])

  /**
   * 测试 ScreenOrientation
   *
   * screen.orientation 相比 orientationchange，从mobile转pc可以触发
   */
  useEffect(() => {
    if (!testScreenOrientation) return

    let changeCb: () => void

    /** @type {ScreenOrientation} */
    const orientation = screen.orientation

    orientation.addEventListener(
      'change',
      (changeCb = () => {
        console.log('screenOrientation change')
        // angle 貌似只有mobile才有有，比如 0 或者 90
        console.log('screenOrientation angle', orientation.angle)
        // 值为 landscape-primary 或者 portrait-primary
        console.log('screenOrientation type', orientation.type)
      })
    )

    /**
     * 关于锁定
     *
     * 注意lock是一个promise，有点特别
     *
     * lock 默认chrome和mobile都有这个报错
     * HtmlOrientation.tsx:76 屏幕方向锁定失败: NotSupportedError: screen.orientation.lock() is not available on this device.
     *
     */
    let isLocked = false
    window.addEventListener('keypress', async e => {
      if (e.key == 't') {
        try {
          if (isLocked) {
            orientation.unlock()
          } else {
            await (orientation as any).lock('landscape')
          }
          isLocked = !isLocked
        } catch (error) {
          console.error('屏幕方向锁定失败:', error)
        }
      }
    })

    return () => {
      orientation.removeEventListener('change', changeCb)
    }
  }, [])

  return <div>HtmlOrientation</div>
}
