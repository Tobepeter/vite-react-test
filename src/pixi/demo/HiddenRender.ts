import { Renderer, Sprite } from 'pixi.js'
import { ITest } from '../util/ITest'
import { Random } from 'mockjs'
import { Easing, Tween } from '@tweenjs/tween.js'
import { Pane } from 'tweakpane'
import { debugTexture } from '../util/debug/DebugTexture'

/**
 * 视口剔除测试
 *
 * 经过测试，PIXI并不会剔除视口外的内容
 */
class HiddenRender implements ITest {
  spList: Sprite[] = []
  posData: Record<string, number[]> = {}

  count = 1
  offscreenDis = 3000
  normalDis = 700

  private isFarAway = false
  private pane: Pane

  init() {
    this.initSprites()
    this.initPane()
    this.renderHack()

    // TODO: 需要封装一个时间管理的
    // setTimeout(() => {
    //   this.toggleHidden()
    // }, 2000)
  }

  initSprites() {
    for (let i = 0; i < this.count; i++) {
      const x = Random.float(-this.normalDis, this.normalDis)
      const y = Random.float(-this.normalDis, this.normalDis)

      const onXEdge = Random.boolean()
      let offscreenX: number
      let offscreenY: number
      if (onXEdge) {
        offscreenX = Random.boolean() ? this.offscreenDis : -this.offscreenDis
        offscreenY = Random.float(-this.offscreenDis, this.offscreenDis)
      } else {
        offscreenX = Random.float(-this.offscreenDis, this.offscreenDis)
        offscreenY = Random.boolean() ? this.offscreenDis : -this.offscreenDis
      }

      this.posData[i] = [x, y, offscreenX, offscreenY]

      const sp = new Sprite()
      sp.name = 'sp' + i
      sp.position.set(x, y)
      sp.texture = debugTexture.getColorTexture(debugTexture.getRandomColor())
      sp.width = 100
      sp.height = 100
      this.spList.push(sp)
      pixiEntry.root.addChild(sp as any)
    }
  }

  initPane() {
    const pane = new Pane()
    this.pane = pane
    pane
      .addButton({
        title: '切换屏幕展示位置',
      })
      .on('click', () => {
        this.toggleFar()
      })
  }

  clear() {
    this.spList.forEach(sp => {
      sp.destroy()
    })
    this.spList = []
    this.pane.dispose()
    this.pane = null
  }

  toggleFar() {
    pixiEntry.tween.removeAll()

    this.isFarAway = !this.isFarAway

    this.spList.forEach((sp, i) => {
      const [x, y, offscreenX, offscreenY] = this.posData[i]

      const targetX = this.isFarAway ? offscreenX : x
      const targetY = this.isFarAway ? offscreenY : y

      const tween = new Tween(sp, pixiEntry.tween).to({ x: targetX, y: targetY }, 500).easing(Easing.Quadratic.Out).start()
    })
  }

  renderHack() {
    const renderer = pixiEntry.app.renderer as Renderer
    const gl = renderer.gl

    const _gl_drawArrays = gl.drawArrays
    gl.drawArrays = function (mode: number, first: number, count: number) {
      console.log('drawArrays', mode, first, count)
      _gl_drawArrays.apply(gl, arguments as any)
    }

    const _gl_drawElements = gl.drawElements
    gl.drawElements = function (mode: number, count: number, type: number, offset: number) {
      console.log('drawElements', mode, count, type, offset)
      _gl_drawElements.apply(gl, arguments as any)
    }
  }
}

export const hiddenRender = new HiddenRender()
