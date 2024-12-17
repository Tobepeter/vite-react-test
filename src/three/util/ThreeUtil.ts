import { WebGLRenderTarget } from 'three'

class ThreeUtil {
  rt2pixels(rt: WebGLRenderTarget) {
    const isHalfFloat = rt.texture.type === THREE.HalfFloatType
    const pixelsCount = rt.width * rt.height * 4
    const pixels = isHalfFloat ? new Uint16Array(pixelsCount) : new Uint8Array(pixelsCount)

    threeEntry.renderer.readRenderTargetPixels(rt, 0, 0, rt.width, rt.height, pixels)

    if (isHalfFloat) {
      const uint8Pixels = new Uint8Array(pixels.length)
      for (let i = 0; i < pixels.length; i++) {
        // NOTE: half float 其实精度是更高的，而且gpu中也是float类型，但是cpu中只有uint16能够接受这个类型，所以得到的是uint
        uint8Pixels[i] = Math.round((pixels[i] / 65535) * 255)
      }
      return uint8Pixels
    }
    return pixels as Uint8Array
  }

  pixels2Canvas(pixels: Uint8Array, width: number, height: number) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    const imageData = new ImageData(new Uint8ClampedArray(pixels), width, height)
    ctx.putImageData(imageData, 0, 0)
    return canvas
  }

  pixelsDownload(pixels: Uint8Array, width: number, height: number, filename: string) {
    const canvas = this.pixels2Canvas(pixels, width, height)
    this.downloadCanvas(canvas, filename)
  }

  downloadRT(rt: WebGLRenderTarget, filename: string) {
    const pixels = this.rt2pixels(rt)
    this.pixelsDownload(pixels, rt.width, rt.height, filename)
  }

  downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
    const a = document.createElement('a')
    a.href = canvas.toDataURL()
    a.download = filename
    a.click()
  }
}

export const threeUtil = new ThreeUtil()
