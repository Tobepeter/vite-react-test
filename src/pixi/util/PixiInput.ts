class PixiInput {
  config: Required<PixiInputConfig> = {
    canScale: false,
    scaleSpeed: 0.1,
    minScale: 0.1,
    maxScale: 20,
    canDrag: false,
    dragSpeed: 1,
    canKeyResetDrag: false,
    keyResetDrag: 'Space',
    // TODO: 待实现
    useStorage: false,
  }

  scale = 1

  // 注意，pixi默认坐标系是css的，这里也是
  mouseX = 0
  mouseY = 0

  canvasLeft = 0
  canvasTop = 0

  isMouseDown = false

  key = ''
  keyboardCode = ''

  init() {
    this.addListener()
    this.updateCanvasRect()
  }

  setConfig(config: PixiInputConfig) {
    this.config = { ...this.config, ...config }
  }

  updateCanvasRect() {
    const canvas = pixiEntry.canvas
    const rect = canvas.getBoundingClientRect()
    this.canvasLeft = rect.left
    this.canvasTop = rect.top
  }

  onWheel = (e: WheelEvent) => {
    if (!this.config.canScale) return

    const delta = e.deltaY
    const mouseX = e.clientX - this.canvasLeft
    const mouseY = e.clientY - this.canvasTop
    const localX = (mouseX - pixiEntry.interactRoot.x) / this.scale
    const localY = (mouseY - pixiEntry.interactRoot.y) / this.scale

    // 默认向上是负数，但是习惯向上是放大
    const deltaScale = -delta * this.config.scaleSpeed * 0.05
    let newScale = this.scale + deltaScale
    newScale = Math.max(this.config.minScale, newScale)
    newScale = Math.min(this.config.maxScale, newScale)

    // 计算新的位置以保持鼠标位置不变
    if (newScale !== this.scale) {
      const newX = mouseX - localX * newScale
      const newY = mouseY - localY * newScale

      this.scale = newScale
      pixiEntry.interactRoot.scale.set(this.scale)
      pixiEntry.interactRoot.position.set(newX, newY)
    }
  }

  onPointerDown = (e: PointerEvent) => {
    this.isMouseDown = true
    this.mouseX = e.clientX - this.canvasLeft
    this.mouseY = e.clientY - this.canvasTop
  }

  onPointerMove = (e: PointerEvent) => {
    const mouseX = e.clientX - this.canvasLeft
    const mouseY = e.clientY - this.canvasTop

    if (this.config.canDrag && this.isMouseDown) {
      const deltaX = mouseX - this.mouseX
      const deltaY = mouseY - this.mouseY
      pixiEntry.interactRoot.x += deltaX * this.config.dragSpeed
      pixiEntry.interactRoot.y += deltaY * this.config.dragSpeed
    }

    this.mouseX = mouseX
    this.mouseY = mouseY
  }

  resetInteact() {
    pixiEntry.interactRoot.position.set(0, 0)
  }

  onPointerUp = (e: PointerEvent) => {
    this.isMouseDown = false
    this.mouseX = e.clientX - this.canvasLeft
    this.mouseY = e.clientY - this.canvasTop
  }

  update(delta: number) {}

  onBlur = () => {
    this.isMouseDown = false
  }

  onVisibilityChange = () => {
    this.isMouseDown = false
  }

  onKeydown = (e: KeyboardEvent) => {
    this.key = e.key
    this.keyboardCode = e.code
  }
  onKeyUp = (e: KeyboardEvent) => {
    this.key = ''
    this.keyboardCode = ''
  }
  onKeyPress = (e: KeyboardEvent) => {
    if (this.config.canKeyResetDrag && e.code === this.config.keyResetDrag) {
      this.resetInteact()
    }
  }

  // TODO: resize destroy 似乎可以抽象一下
  onResize() {
    this.updateCanvasRect()
  }

  addListener() {
    const canvas = pixiEntry.canvas
    canvas.addEventListener('wheel', this.onWheel)
    canvas.addEventListener('pointermove', this.onPointerMove)
    canvas.addEventListener('pointerdown', this.onPointerDown)
    canvas.addEventListener('pointerup', this.onPointerUp)
    window.addEventListener('blur', this.onBlur)
    window.addEventListener('visibilitychange', this.onVisibilityChange)
    window.addEventListener('keydown', this.onKeydown)
    window.addEventListener('keyup', this.onKeyUp)
    window.addEventListener('keypress', this.onKeyPress)
  }

  destroy() {
    const canvas = pixiEntry.canvas
    canvas.removeEventListener('wheel', this.onWheel)
    canvas.removeEventListener('pointermove', this.onPointerMove)
    canvas.removeEventListener('pointerdown', this.onPointerDown)
    canvas.removeEventListener('pointerup', this.onPointerUp)
    window.removeEventListener('blur', this.onBlur)
    window.removeEventListener('visibilitychange', this.onVisibilityChange)
    window.removeEventListener('keydown', this.onKeydown)
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('keypress', this.onKeyPress)
  }
}

export type PixiInputConfig = {
  canScale?: boolean
  scaleSpeed?: number
  minScale?: number
  maxScale?: number
  canDrag?: boolean
  dragSpeed?: number
  canKeyResetDrag?: boolean
  keyResetDrag?: string
  useStorage?: boolean
}

export const pixiInput = new PixiInput()
