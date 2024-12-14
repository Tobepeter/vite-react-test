import { BoxGeometry, MeshBasicMaterial, Mesh, Color, Vector3 } from 'three'
import { IThreeTest } from '../util/IThreeTest'
import { Pane } from 'tweakpane'

/**
 * 通过color+lightness来设置rgb
 */
class HSL2RGBSingleParam implements IThreeTest {
  mtl: MeshBasicMaterial
  pane: Pane

  params = {
    lightness: 1,
    color: '#FF0000',
  }

  init() {
    this.createCube()
    this.initPane()
  }

  createCube() {
    this.mtl = new MeshBasicMaterial()
    const cube = new Mesh(new BoxGeometry(1, 1, 1), this.mtl)
    threeEntry.testRoot.add(cube)
  }

  initPane() {
    const pane = new Pane()
    this.pane = pane

    pane
      .addBinding(this.params, 'lightness', {
        label: 'Lightness',
        min: 0,
        max: 1,
        step: 0.01,
      })
      .on('change', () => this.updateMaterial())

    pane
      .addBinding(this.params, 'color', {
        label: 'Color',
        format: 'hex',
      })
      .on('change', () => this.updateMaterial())
  }

  updateMaterial() {
    const { lightness, color } = this.params
    const c = new Color(color)
    const hsl = this.rgb2hsl(c.r, c.g, c.b)
    hsl.z = lightness
    const rgb = this.hsl2rgb(hsl.x, hsl.y, hsl.z)
    c.setRGB(rgb.x, rgb.y, rgb.z)
    this.mtl.color.set(c)
  }

  // RGB 转 HSL
  rgb2hsl(r: number, g: number, b: number) {
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }

      h /= 6
    }

    h = Math.round(h * 1000) / 1000
    s = Math.round(s * 1000) / 1000
    l = Math.round(l * 1000) / 1000

    return new Vector3(h, s, l)
  }

  hsl2rgb(h: number, s: number, l: number) {
    let r: number, g: number, b: number

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q

      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    r = Math.round(r * 1000) / 1000
    g = Math.round(g * 1000) / 1000
    b = Math.round(b * 1000) / 1000

    return new Vector3(r, g, b)
  }

  clear() {
    this.mtl.dispose()
    this.pane.dispose()
  }
}

export const hsl2rgbSingleParam = new HSL2RGBSingleParam()
