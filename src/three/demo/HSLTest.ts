import { BoxGeometry, MeshBasicMaterial, Mesh, Color, Vector3 } from 'three'
import { IThreeTest } from '../util/IThreeTest'
import { Pane } from 'tweakpane'

/**
 * 学习HSL参数
 */
class HSLTest implements IThreeTest {
  mtl: MeshBasicMaterial
  pane: Pane

  params = {
    h: 0,
    s: 0,
    l: 0,
  }

  init() {
    this.createCube()
    this.initParams()
    this.initPane()
  }

  createCube() {
    this.mtl = new MeshBasicMaterial()
    const cube = new Mesh(new BoxGeometry(1, 1, 1), this.mtl)
    threeEntry.testRoot.add(cube)
  }

  initPane() {
    const pane = new Pane()
    const folder = pane.addFolder({ title: 'HSLTest' })
    folder
      .addBinding(this.params, 'h', {
        label: 'H',
        min: 0,
        max: 1,
        step: 0.01,
      })
      .on('change', () => this.updateParams())
    folder
      .addBinding(this.params, 's', {
        label: 'S',
        min: 0,
        max: 1,
        step: 0.01,
      })
      .on('change', () => this.updateParams())
    folder
      .addBinding(this.params, 'l', {
        label: 'L',
        min: 0,
        max: 1,
        step: 0.01,
      })
      .on('change', () => this.updateParams())
  }

  initParams() {
    const color = new Color('#FF0000')
    color.getHSL(this.params)
    this.updateParams()
  }

  updateParams() {
    this.mtl.color.setHSL(this.params.h, this.params.s, this.params.l)
  }

  clear() {
    this.mtl.dispose()
    this.pane.dispose()
  }
}

export const hslTest = new HSLTest()
