class Adapt {
  dpr = 1 // 只会赋值第一次
  currDpr = 1 // 会变的，比如按cmd + 加号放大

  width = 0
  height = 0
  cssWidth = 0
  cssHeight = 0

  canvas: HTMLCanvasElement

  noThrottle = false
  resizeThrottleTime = 100

  private resizeTimer = -1
  private lastResizeTime = 0

  cb?: () => void

  init(canvas: HTMLCanvasElement, cb?: () => void) {
    this.canvas = canvas
    this.cb = cb

    this.dpr = window.devicePixelRatio

    window.addEventListener('resize', this.throttleResize)
    this.throttleResize()

    this.adjustCss()
  }

  destroy() {
    window.removeEventListener('resize', this.throttleResize)
    this.cb = null
    this.canvas = null
    this.stopThrottleResize()
  }

  /**
   * 移除默认浏览器的 margin 8px
   */
  adjustCss() {
    document.body.style.margin = '0'
  }

  stopThrottleResize() {
    if (this.resizeTimer !== -1) {
      clearTimeout(this.resizeTimer as number)
      this.resizeTimer = -1
    }
  }

  throttleResize = () => {
    if (this.noThrottle) {
      this.onResize()
      return
    }
    if (this.resizeTimer !== -1) return

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
    }, this.resizeThrottleTime) as any // TODO: 这个nodejs的类型混合有空处理下
  }

  onResize() {
    this.currDpr = window.devicePixelRatio

    const innerWidth = window.innerWidth || document.documentElement.clientWidth
    const innerHeight = window.innerHeight || document.documentElement.clientHeight
    this.width = innerWidth * this.dpr
    this.height = innerHeight * this.dpr
    this.cssWidth = innerWidth
    this.cssHeight = innerHeight

    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.width = `${this.cssWidth}px`
    this.canvas.style.height = `${this.cssHeight}px`

    this.cb?.()
  }
}

export const adapt = new Adapt()
