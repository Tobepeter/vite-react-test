import { BaseTexture, Container, Sprite, Texture } from 'pixi.js'
import { PixiDomConfig } from '../util/dom/PixiDomUtil'
import { ITest } from '../util/ITest'
import { Pane, InputBindingApi } from 'tweakpane'
import { imageUtil } from '../util/ImageUtil'
import { debugTexture } from '../util/debug/DebugTexture'

class PixelChecker implements ITest {
  config = {
    dom: {
      enableUpload: true,
    },
    input: {
      canScale: true,
      canDrag: true,
    },
  }

  sp: Sprite
  pixelsCntr: Container
  url: string

  gridSize = 10

  /**
   * 分区渲染
   * NOTE：不太好支持特别大的canvas，会渲染失败
   */
  chunkSize = 1024

  useStorage = true
  readonly storageKey = 'pixel-checker:url'

  init() {
    pixiEntry.domHandle.onFileUpload = this.onFileUpload

    this.pixelsCntr = new Container()
    this.pixelsCntr.name = 'pixelCntr'
    pixiEntry.root.addChild(this.pixelsCntr)

    this.reloadUrl()
  }

  onFileUpload = async (file: File) => {
    this.url = await imageUtil.fileToDataUri(file)
    this.saveUrl()
    this.refresh()
  }

  saveUrl() {
    if (this.useStorage) {
      localStorage.setItem(this.storageKey, this.url)
    }
  }

  async reloadUrl() {
    if (!this.useStorage) {
      localStorage.removeItem(this.storageKey)
      return
    }

    this.url = localStorage.getItem(this.storageKey)
    this.refresh()
  }

  async refresh() {
    this.reset()

    // this.renderUrl()
    await this.renderImageData()
  }

  /**
   * 渲染单个精灵
   */
  renderUrl() {
    this.clear()

    if (this.url) {
      const sp = new Sprite()
      this.sp = sp
      sp.anchor.set(0.5)
      sp.texture = Texture.from(this.url)

      pixiEntry.root.addChild(sp)
    }
  }

  async renderImageData() {
    // await this.renderImageDataBySprite()
    // await this.renderImageDataByCanvas()
    await this.renderImageDataByCanvasByChunk()
  }

  /**
   * 使用pixi的sprite来渲染
   *
   * NOTE: 使用这个方法非常卡，看起来pixi不太支持创建特别多的Sprite
   */
  async renderImageDataBySprite() {
    this.pixelsCntr.removeChildren()

    if (!this.url) return

    const imageData = await imageUtil.url2ImageData(this.url)
    if (!imageData) return

    const width = imageData.width
    const height = imageData.height
    const gridSize = this.gridSize
    const displayWidth = width * gridSize
    const displayHeight = height * gridSize
    const w2 = displayWidth / 2
    const h2 = displayHeight / 2

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4
        const r = imageData.data[i]
        const g = imageData.data[i + 1]
        const b = imageData.data[i + 2]
        const a = imageData.data[i + 3]

        // 创建一个小方块精灵
        const pixel = new Sprite(Texture.WHITE)
        pixel.name = `p-${x}-${y}`
        pixel.width = gridSize
        pixel.height = gridSize
        pixel.x = -w2 + gridSize * x - gridSize / 2
        pixel.y = -h2 + gridSize * y - gridSize / 2
        pixel.tint = (r << 16) + (g << 8) + b
        pixel.alpha = a / 255

        this.pixelsCntr.addChild(pixel)
      }
    }
  }

  /**
   * 使用canvas来渲染
   *
   * NOTE：测试起来感觉比多个Sprite好多了，依然是用Canvas，只是格子放大了
   */
  async renderImageDataByCanvas() {
    if (!this.url) return

    const imageData = await imageUtil.url2ImageData(this.url)
    if (!imageData) return

    const width = imageData.width
    const height = imageData.height
    const gridSize = this.gridSize

    const newWidth = width * gridSize
    const newHeight = height * gridSize

    const canvas = document.createElement('canvas')
    canvas.width = newWidth
    canvas.height = newHeight
    const ctx = canvas.getContext('2d')

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4
        const r = imageData.data[i]
        const g = imageData.data[i + 1]
        const b = imageData.data[i + 2]
        const a = imageData.data[i + 3]
        ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`
        ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize)
      }
    }
  }
  /**
   * 使用canvas来渲染
   *
   * NOTE：测试起来感觉比多个Sprite好多了，依然是用Canvas，只是格子放大了
   */
  async renderImageDataByCanvasByChunk() {
    if (!this.url) return

    const imageData = await imageUtil.url2ImageData(this.url)
    if (!imageData) return

    const width = imageData.width
    const height = imageData.height
    const gridSize = this.gridSize

    const targetWidth = width * gridSize
    const targetHeight = height * gridSize

    const chunkSize = this.chunkSize
    const chunkW = Math.ceil(targetWidth / chunkSize)
    const chunkH = Math.ceil(targetHeight / chunkSize)

    const canvasList: HTMLCanvasElement[] = []
    const ctxList: CanvasRenderingContext2D[] = []

    const chunkCount = chunkW * chunkH

    // 初始化分区
    for (let i = 0; i < chunkCount; i++) {
      const canvas = document.createElement('canvas')
      canvas.width = chunkSize
      canvas.height = chunkSize
      const ctx = canvas.getContext('2d')!
      canvasList.push(canvas)
      ctxList.push(ctx)
    }

    // 遍历原始像素，如果当前像素被chunk打断，同时用下一个chunk渲染
    // 遍历原始像素
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4
        const r = imageData.data[i]
        const g = imageData.data[i + 1]
        const b = imageData.data[i + 2]
        const a = imageData.data[i + 3]

        // 计算目标坐标
        const targetX = x * gridSize
        const targetY = y * gridSize

        // 计算当前像素属于哪个chunk
        const chunkX = Math.floor(targetX / chunkSize)
        const chunkY = Math.floor(targetY / chunkSize)
        const chunkIndex = chunkY * chunkW + chunkX

        // 获取对应的ctx
        const ctx = ctxList[chunkIndex]

        // 在chunk内的相对坐标
        const relativeX = targetX % chunkSize
        const relativeY = targetY % chunkSize

        // 绘制像素
        ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`
        ctx.fillRect(relativeX, relativeY, gridSize, gridSize)

        // 如果当前像素跨越了chunk边界，需要在相邻的chunk中也绘制
        if (relativeX + gridSize > chunkSize) {
          // 需要在右侧chunk中绘制
          const rightChunkIndex = chunkIndex + 1
          if (rightChunkIndex < chunkCount) {
            const rightCtx = ctxList[rightChunkIndex]
            rightCtx.fillStyle = `rgba(${r},${g},${b},${a / 255})`
            rightCtx.fillRect(
              0,
              relativeY,
              (relativeX + gridSize) % chunkSize,
              gridSize
            )
          }
        }

        if (relativeY + gridSize > chunkSize) {
          // 需要在下方chunk中绘制
          const bottomChunkIndex = chunkIndex + chunkW
          if (bottomChunkIndex < chunkCount) {
            const bottomCtx = ctxList[bottomChunkIndex]
            bottomCtx.fillStyle = `rgba(${r},${g},${b},${a / 255})`
            bottomCtx.fillRect(
              relativeX,
              0,
              gridSize,
              (relativeY + gridSize) % chunkSize
            )
          }
        }

        if (
          relativeX + gridSize > chunkSize &&
          relativeY + gridSize > chunkSize
        ) {
          // 需要在右下方chunk中绘制
          const bottomRightChunkIndex = chunkIndex + chunkW + 1
          if (bottomRightChunkIndex < chunkCount) {
            const bottomRightCtx = ctxList[bottomRightChunkIndex]
            bottomRightCtx.fillStyle = `rgba(${r},${g},${b},${a / 255})`
            bottomRightCtx.fillRect(
              0,
              0,
              (relativeX + gridSize) % chunkSize,
              (relativeY + gridSize) % chunkSize
            )
          }
        }
      }
    }

    // 将所有canvas添加到容器中
    for (let y = 0; y < chunkH; y++) {
      for (let x = 0; x < chunkW; x++) {
        const chunkIndex = y * chunkW + x
        const canvas = canvasList[chunkIndex]
        const texture = PIXI.Texture.from(canvas)
        const sprite = new PIXI.Sprite(texture)
        sprite.x = x * chunkSize
        sprite.y = y * chunkSize
        this.pixelsCntr.addChild(sprite)
      }
    }
  }

  reset() {
    if (this.sp) {
      this.sp.destroy()
      this.sp = null
    }
    this.pixelsCntr.removeChildren()
  }

  clear() {
    this.reset()
    this.pixelsCntr.destroy()
  }
}

export const pixelChecker = new PixelChecker()

if (import.meta.hot) {
  import.meta.hot.accept((mod) => {
    // 复用一些hmr的状态
    pixelChecker.url = mod.url
  })
}
