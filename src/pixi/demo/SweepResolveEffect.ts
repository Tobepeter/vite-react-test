import { Color, Sprite, Texture } from 'pixi.js'
import { ITest } from '../util/ITest'

/**
 * 从下往上的扫光溶解效果
 */
class SweepResolveEffect implements ITest {
  vs = ``
  fs = ``

  init() {
    this.initSprite()
  }

  initSprite() {
    const sp = new Sprite(this.getCircleChessboardTexture())
    sp.anchor.set(0.5)
    pixiEntry.root.addChild(sp)
  }

  getCircleChessboardTexture() {
    const size = 256
    const radis = size / 2
    const gridSize = 32
    const color1 = 0x777777
    const color2 = 0xffffff

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = size
    canvas.height = size

    const color1Arr = new Color(color1).toUint8RgbArray()
    const color2Arr = new Color(color2).toUint8RgbArray()

    const imageData = ctx.createImageData(size, size)
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const xdis = x - radis
        const ydis = y - radis
        const distance = Math.sqrt(xdis * xdis + ydis * ydis)
        if (distance > radis) continue

        const index = (y * size + x) * 4
        const gridCol = Math.floor(x / gridSize)
        const gridRow = Math.floor(y / gridSize)
        const color = (gridCol + gridRow) % 2 === 0 ? color1Arr : color2Arr
        imageData.data[index] = color[0]
        imageData.data[index + 1] = color[1]
        imageData.data[index + 2] = color[2]
        imageData.data[index + 3] = 255
      }
    }

    ctx.putImageData(imageData, 0, 0)

    const texture = Texture.from(canvas)
    return texture
  }
}

export const sweepResolveEffect = new SweepResolveEffect()
