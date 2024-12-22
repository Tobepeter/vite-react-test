import { Mesh, MeshBasicMaterial, NormalBlending, OrthographicCamera, PlaneGeometry, Scene, Texture, Vector2, WebGLRenderTarget } from 'three'
import { glUtil } from './GLUtil'

class ThreeUtil {
  /**
   * 将渲染目标的像素数据转换为类型化数组
   * @param rt 渲染目标 可以为null，表示当前屏幕
   * @returns 像素数据
   */
  rt2pixels(rt: WebGLRenderTarget) {
    let isHalfFloat = false
    let pixels: Uint8Array | Uint16Array

    const size = this.getRTSize(rt)
    const pixelsCount = size.x * size.y * 4
    if (rt) {
      isHalfFloat = rt.texture.type === THREE.HalfFloatType
      pixels = isHalfFloat ? new Uint16Array(pixelsCount) : new Uint8Array(pixelsCount)
    } else {
      pixels = new Uint8Array(pixelsCount)
    }

    threeEntry.renderer.readRenderTargetPixels(rt, 0, 0, size.x, size.y, pixels)

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

  getRTSize(rt?: WebGLRenderTarget) {
    if (rt) {
      return new Vector2(rt.width, rt.height)
    }
    const gl = threeEntry.renderer.getContext()
    return new Vector2(gl.drawingBufferWidth, gl.drawingBufferHeight)
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

  rt2Canvas(rt: WebGLRenderTarget) {
    const pixels = this.rt2pixels(rt)
    const size = this.getRTSize(rt)
    return this.pixels2Canvas(pixels, size.x, size.y)
  }

  dataURLFromPixels(pixels: Uint8Array, width: number, height: number) {
    const canvas = this.pixels2Canvas(pixels, width, height)
    return canvas.toDataURL()
  }

  dataURLFromRT(rt: WebGLRenderTarget) {
    const pixels = this.rt2pixels(rt)
    const size = this.getRTSize(rt)
    return this.dataURLFromPixels(pixels, size.x, size.y)
  }

  downloadPixels(pixels: Uint8Array, width: number, height: number, filename: string) {
    const canvas = this.pixels2Canvas(pixels, width, height)
    this.downloadCanvas(canvas, filename)
  }

  downloadRT(rt: WebGLRenderTarget, filename: string) {
    const pixels = this.rt2pixels(rt)
    const size = this.getRTSize(rt)
    this.downloadPixels(pixels, size.x, size.y, filename)
  }

  downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
    const a = document.createElement('a')
    a.href = canvas.toDataURL()
    a.download = filename
    a.click()
  }

  forceDisplayCanvas(canvas: HTMLCanvasElement) {
    canvas.style.cssText = `
      position: fixed;
      background: #FFFFFF;
      width: 300px;
      height: 300px;
      top: 20px;
      left: 20px;
      zIndex: 999;
    `
    document.body.appendChild(canvas)
  }

  downloadTexture(texture: Texture, filename: string) {
    // TODO: 此方法还没有验证
    let valid = true
    if (!texture.image) {
      valid = false
    } else if (!texture.image.width || !texture.image.height) {
      valid = false
    }
    if (!valid) {
      console.error('Texture is not valid')
      return
    }

    const renderer = threeEntry.renderer

    const rt = new WebGLRenderTarget(texture.image.width, texture.image.height)

    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    // TODO: 不需要设置z好像也能拍到，为什么
    camera.position.set(0, 0, 0.1)
    const scene = new Scene()
    const geometry = new PlaneGeometry(2, 2)
    const material = new MeshBasicMaterial({
      map: texture,
      transparent: true,
      // blending: NormalBlending,
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    const currentRT = renderer.getRenderTarget()
    const currentAutoClear = renderer.autoClear
    renderer.setRenderTarget(rt)
    renderer.autoClear = false

    // TEST
    debugger
    glUtil.monitorCommon()
    renderer.render(scene, camera)
    glUtil.unmonitor()
    debugger

    this.downloadRT(rt, filename)

    renderer.setRenderTarget(currentRT)
    renderer.autoClear = currentAutoClear

    rt.dispose()
    geometry.dispose()
    material.dispose()
  }
}

export const threeUtil = new ThreeUtil()
