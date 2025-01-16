class ThreeAdapt {
  dpr = 1 // 只会复制第一次
  currDpr = 1 // 会变的，比如按cmd + 加号放大

  width = 0
  height = 0
  cssWidth = 0
  cssHeight = 0
  aspect = 1

  noThrottle = false
  resizeThrottleTime = 100

  private resizeTimer = -1
  private lastResizeTime = 0

  cb?: () => void

  init(cb?: () => void) {
    this.cb = cb
    this.dpr = window.devicePixelRatio

    window.addEventListener('resize', this.throttleResize)
    this.onResize()
  }

  throttleResize = () => {
    if (this.noThrottle) {
      this.onResize()
      return
    }

    if (this.resizeTimer > -1) return

    const now = Date.now()

    // 没有定时器且上一次resize比较久远了，可以直接触发（加速第一次时间）
    if (now - this.lastResizeTime > this.resizeThrottleTime) {
      this.onResize()
      this.lastResizeTime = now
      return
    }

    this.resizeTimer = setTimeout(() => {
      this.onResize()
      this.lastResizeTime = now
      this.resizeTimer = -1
    }, this.resizeThrottleTime) as unknown as number
  }

  stopThrottleResize() {
    if (this.resizeTimer > -1) {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = -1
    }
  }

  destroy() {
    window.removeEventListener('resize', this.throttleResize)
    this.cb = null
    this.stopThrottleResize()
  }

  onResize() {
    this.currDpr = window.devicePixelRatio
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.cssWidth = window.innerWidth
    this.cssHeight = window.innerHeight
    this.aspect = this.width / this.height
    this.cb?.()
  }
}

export const threeAdapt = new ThreeAdapt()
