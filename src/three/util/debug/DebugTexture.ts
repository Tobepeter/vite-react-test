import { Random } from 'mockjs'
import { Texture } from 'three'

class DebugTexture {
  dummyImage = 'https://dummyimage.com/200x200/000/fff'
  dummyImage2 = 'https://dummyimage.com/400x400/fff/000'
  bunnyUrl = 'https://www.pixijs.com/assets/bunny.png'

  /**
   * 颜色配置
   * @desc 使用string，不使用number是因为canvas 2d API只支持string
   */
  colorMap = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
    yellow: '#ffff00',
    purple: '#ff00ff',
    cyan: '#00ffff',
    white: '#ffffff',
    black: '#000000',
    gray: '#808080',
  } satisfies Record<string, string>

  chessboard: Texture

  colorTextureMap = {
    white: null,
    red: null,
    green: null,
    blue: null,
    yellow: null,
    purple: null,
    cyan: null,
    black: null,
    gray: null,
  } satisfies Record<string, Texture>

  init() {
    this.initTextures()
  }

  getDummyImg(opt?: {
    w?: number
    h?: number
    bgColor?: string
    textColor?: string
  }) {
    const { w = 200, h = 200, bgColor = 'fff', textColor = '000' } = opt || {}
    return `https://dummyimage.com/${w}x${h}/${bgColor}/${textColor}`
  }

  getRandomDummyImg(
    sizeList?: number[],
    bgColorList?: string[],
    textColorList?: string[]
  ) {
    if (!sizeList) {
      sizeList = [200, 300, 400]
    }

    if (!bgColorList) {
      bgColorList = Object.values(this.colorMap)
    }

    if (!textColorList) {
      textColorList = Object.values(this.colorMap)
    }

    const size = Random.pick(sizeList)
    // URL不支持#，要去掉
    const bgColor = Random.pick(bgColorList).slice(1)
    const textColor = Random.pick(textColorList).slice(1)

    return this.getDummyImg({ w: size, h: size, bgColor, textColor })
  }

  getChessboardTexture(gridSize: number = 16, size: number = 256) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    canvas.width = size
    canvas.height = size

    for (let x = 0; x < size; x += gridSize) {
      for (let y = 0; y < size; y += gridSize) {
        const isEven = (x / gridSize + y / gridSize) % 2 === 0
        ctx.fillStyle = isEven ? '#ffffff' : '#cccccc'
        ctx.fillRect(x, y, gridSize, gridSize)
      }
    }

    return new Texture(canvas)
  }

  getCircleTexture(color: string = '#ffffff', size = 256) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    canvas.width = size
    canvas.height = size

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.fill()

    return new Texture(canvas)
  }

  getColorTexture(color: string, size: number = 256) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    canvas.width = size
    canvas.height = size

    ctx.fillStyle = color
    ctx.fillRect(0, 0, size, size)

    return new Texture(canvas)
  }

  private initTextures() {
    this.chessboard = this.getChessboardTexture()

    const { colorMap, colorTextureMap } = this
    const colors = Object.keys(colorMap)

    for (const color of colors) {
      colorTextureMap[color] = this.getColorTexture(colorMap[color])
    }
  }
}

export const debugTexture = new DebugTexture()
