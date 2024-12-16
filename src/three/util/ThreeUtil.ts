import { WebGLRenderTarget } from 'three'

class ThreeUtil {
  rt2pixels(rt: WebGLRenderTarget) {
    const pixels = new Uint8Array(rt.width * rt.height * 4)
    threeEntry.renderer.readRenderTargetPixels(rt, 0, 0, rt.width, rt.height, pixels)
    return pixels
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
