import { webGLTest } from './WebGLTest'

class WebGLEntry {
  config = {
    preferGL2: true,
    autoResize: true,
    resizeInterval: 100,
    canThrottleResize: false,

    contextParams: {
      depth: true,
      stencil: true,
      antialias: true,
    } as WebGLContextAttributes,
  }

  canvas: HTMLCanvasElement

  isInited = false

  gl: WebGLRenderingContext
  gl2: WebGL2RenderingContext

  private lastResizeTime = 0
  private resizeTimer = -1

  init() {
    if (this.isInited) {
      return
    }
    this.isInited = true

    const canvas = document.createElement('canvas')
    this.canvas = canvas

    this.listenResize()
    this.resize()

    webGLTest.init()
  }

  getGL1() {
    if (this.gl) {
      return this.gl
    }
    this.gl = this.canvas.getContext('webgl', this.config.contextParams)
    return this.gl
  }

  getGL2() {
    if (this.gl2) {
      return this.gl2
    }
    this.gl2 = this.canvas.getContext('webgl2', this.config.contextParams)
    return this.gl2
  }

  getGL() {
    if (this.config.preferGL2) {
      return this.getGL2()
    }
    return this.getGL1()
  }

  resize() {
    const cssWidth = window.innerWidth
    const cssHeight = window.innerHeight
    const dpr = window.devicePixelRatio
    const width = Math.floor(cssWidth * dpr)
    const height = Math.floor(cssHeight * dpr)

    console.log('resize', width, height)

    const canvas = this.canvas
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${cssWidth}px`
    canvas.style.height = `${cssHeight}px`

    // 如果gl创建，每次resize都渲染
    const gl = this.gl || this.gl2
    if (gl) {
      gl.viewport(0, 0, width, height)
      webGLTest.render()
    }
  }

  listenResize() {
    window.addEventListener('resize', this.bindThrottleResize)
  }

  unlistenResize() {
    window.removeEventListener('resize', this.bindThrottleResize)
  }

  bindThrottleResize = () => {
    this.throttleResize()
  }

  throttleResize() {
    if (!this.config.autoResize) {
      return
    }

    if (!this.config.canThrottleResize) {
      this.resize()
      return
    }

    if (this.resizeTimer > -1) {
      return
    }

    const now = performance.now()
    if (now - this.lastResizeTime > this.config.resizeInterval) {
      this.resize()
      this.lastResizeTime = now
      return
    }
    this.resizeTimer = window.setTimeout(() => {
      this.resize()
      this.lastResizeTime = performance.now()
      this.resizeTimer = -1
    }, this.config.resizeInterval)
  }

  stopThrottleResize() {
    if (this.resizeTimer > -1) {
      window.clearTimeout(this.resizeTimer)
      this.resizeTimer = -1
    }
  }
}

export const webGLEntry = new WebGLEntry()
