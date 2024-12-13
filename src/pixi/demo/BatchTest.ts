import { Graphics, Renderer, Sprite } from 'pixi.js'
import { ITest } from '../util/ITest'
import { debugTexture } from '../util/debug/DebugTexture'
import { Pane } from 'tweakpane'

/**
 * 渲染合批测试
 *
 * [合批] 如果是多个精灵，会是 *6 的count一次渲染
 * [跳过] 没有纹理，visible为false，alpha为0的精灵都会跳过
 * [透明] 即使是中间夹杂了透明的内容，也不会打断，看起来pixi是默认透明渲染的
 * [矢量] 矢量绘制，会有三角剖分，circle会有96个三角面
 * [矢量精灵] 矢量和精灵是可以混搭的，都可以合批
 *
 */
class BatchTest implements ITest {
  pane: Pane
  paneParam = {
    mode: '',
    count: 10,
    testMode: 'sprites' as keyof typeof this.testMap,
  }

  testMap = {
    sprites: { func: this.test_sprites, label: '精灵' },
    visible: { func: this.test_visible, label: '精灵-visible' },
    alpha: { func: this.test_alpha, label: '精灵-alpha' },
    empty: { func: this.test_empty, label: '精灵-empty' },
    alpha_interupt: { func: this.test_alpha_interupt, label: '精灵-alpha_打断' },
    graphics_rect: { func: this.test_graphics_rect, label: '矢量-rect' },
    graphics_line: { func: this.test_graphics_line, label: '矢量-line' },
    graphics_circle: { func: this.test_graphics_circle, label: '矢量-circle' },
    graphics_two_circle: { func: this.test_graphics_two_circle, label: '矢量-两个circle' },
    graphics_interupt: { func: this.test_graphics_interupt, label: '矢量-打断' },
  }

  testMode: keyof typeof this.testMap = 'sprites'

  init() {
    this.runTest()
    this.initPane()
    this.renderHack()
  }

  runTest() {
    this.testMap[this.testMode].func.call(this)
  }

  initPane() {
    this.pane = new Pane()
    this.pane.addBinding(this.paneParam, 'mode', {
      label: '渲染模式',
    })
    this.pane.addBinding(this.paneParam, 'count', {
      label: '渲染点数',
    })
    // 添加测试模式下拉选择
    this.pane
      .addBinding(this.paneParam, 'testMode', {
        label: '测试类型',
        options: Object.entries(this.testMap).map(([value, item]) => ({
          text: item.label,
          value: value,
        })),
      })
      .on('change', ev => {
        pixiEntry.root.removeChildren()
        this.testMode = ev.value as keyof typeof this.testMap
        this.paneParam.count = 0
        this.pane.refresh()
        this.runTest()
      })
  }

  clear() {
    this.pane.dispose()
  }

  test_sprites() {
    const count = 10
    for (let i = 0; i < count; i++) {
      const sp = this.getSprite()
      sp.name = 'sp' + i
      sp.x = i * 10
      sp.y = i * 10
    }
  }

  test_visible() {
    const sp = this.getSprite()
    sp.x = 100
    sp.y = 100
    sp.visible = false
  }

  test_alpha() {
    const sp = this.getSprite()
    sp.x = 100
    sp.y = 100
    sp.alpha = 0
  }

  test_empty() {
    const sp = new Sprite()
    sp.x = 100
    sp.y = 100
    pixiEntry.root.addChild(sp)
  }

  test_alpha_interupt() {
    const sp1 = this.getSprite()
    sp1.x = 100

    const sp2 = this.getSprite()
    sp2.x = 200
    sp2.alpha = 0.5

    const sp3 = this.getSprite()
    sp3.x = 300
  }

  test_graphics_rect() {
    const g = new Graphics()
    g.x = 100
    g.y = 100
    g.beginFill(0xff0000)
    g.drawRect(0, 0, 100, 100)
    pixiEntry.root.addChild(g)
  }

  test_graphics_line() {
    // 经过测试，一个line，的count是6，和rect一样
    const g = new Graphics()
    g.x = 100
    g.y = 100
    g.lineStyle(1, 0xff0000)
    g.moveTo(0, 0)
    g.lineTo(100, 100)
    pixiEntry.root.addChild(g)
  }

  test_graphics_circle() {
    // 经过测试，一个circle，的count是276，也就是276/3=96个三角面
    const g = new Graphics()
    g.x = 100
    g.y = 100
    g.beginFill(0xff0000)
    g.drawCircle(0, 0, 50)
    pixiEntry.root.addChild(g)
  }

  test_graphics_two_circle() {
    // 经过测试，两个circle，的count是552，也就是552/3=184个三角面，多一个circle就对应的三角面
    const g = new Graphics()
    g.x = 100
    g.y = 100
    g.beginFill(0xff0000)
    g.drawCircle(0, 0, 50)
    g.beginFill(0x00ff00)
    g.drawCircle(100, 0, 50)
    pixiEntry.root.addChild(g)
  }

  test_graphics_interupt() {
    // 结果是 288=6+276+6，也就是graphics是可以合批的
    const sp1 = this.getSprite()
    sp1.x = 100

    const g = new Graphics()
    g.x = 200
    g.y = 200
    g.beginFill(0xff0000)
    g.drawCircle(0, 0, 50)
    pixiEntry.root.addChild(g)

    const sp3 = this.getSprite()
    sp3.x = 300
  }

  getSprite() {
    const sp = new Sprite()
    sp.texture = debugTexture.getColorTexture(debugTexture.getRandomColor())
    pixiEntry.root.addChild(sp)
    return sp
  }

  renderHack() {
    const renderer = pixiEntry.app.renderer as Renderer
    const gl = renderer.gl

    const paneParam = this.paneParam
    const pane = this.pane

    const _gl_drawArrays = gl.drawArrays
    gl.drawArrays = function (mode: number, first: number, count: number) {
      // console.log('drawArrays', mode, first, count)
      paneParam.mode = 'drawArrays'
      paneParam.count = count
      pane.refresh()
      _gl_drawArrays.apply(gl, arguments as any)
    }

    const _gl_drawElements = gl.drawElements
    gl.drawElements = function (mode: number, count: number, type: number, offset: number) {
      // console.log('drawElements', mode, count, type, offset)
      paneParam.mode = 'drawElements'
      paneParam.count = count
      pane.refresh()
      _gl_drawElements.apply(gl, arguments as any)
    }
  }
}

export const batchTest = new BatchTest()
