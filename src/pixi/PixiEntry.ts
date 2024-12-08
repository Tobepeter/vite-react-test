import { Application, Color, Container, Ticker, utils } from 'pixi.js'
import { adapt } from './util/Adapt'
import { pixiGlobal } from './util/PixiGlobal'
import { rectTest } from './demo/RectTest'
import { timeShaderTest } from './demo/TimeShaderTest'
import { pixiTest } from './PixiTest'
import { debugHelper } from './util/debug/DebugHelper'
import { debugVisual } from './util/debug/DebugVisual'
import { scriptLoader } from './util/ScriptLoader'
import { debugUtil } from './util/debug/DebugUtil'
import { PixiDomHandle } from './util/dom/PixiDomUtil'
import { pixiInput } from './util/PixiInput'

class PixiEntry {
  isInited = false
  app: Application
  canvas: HTMLCanvasElement

  stage: Container

  ticker: Ticker

  interactRoot: Container

  /**
   * 根容器
   * @desc 默认 stage 尺寸是参考css的，这里缩放一下
   * @desc 同时默认居中，方便使用
   */
  root: Container

  domHandle?: PixiDomHandle

  async init() {
    if (this.isInited) return
    this.isInited = true

    // TODO: 内部是否支持自动适配？

    const backgroundColor = 0x000000
    // const backgroundColor = 0xffffff;

    this.app = new Application({
      width: 800,
      height: 600,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      resizeTo: window,
      backgroundColor,

      // NOTE: 貌似不能跑起来canvas模式
      // forceCanvas: true,
    })
    this.canvas = this.app.view as HTMLCanvasElement
    this.stage = this.app.stage

    // NOTE: 这个其实是不需要的，但是如果不这么设置，每次hmr都会闪烁一下（默认body是白色的）
    document.body.style.backgroundColor = new Color(backgroundColor).toHex()

    // NOTE: root位置不会变，但是交互支持拖拽缩放之类的
    this.interactRoot = new Container()
    this.interactRoot.name = 'interactRoot'
    this.stage.addChild(this.interactRoot)

    this.root = new Container()
    this.root.name = 'centerRoot'
    this.interactRoot.addChild(this.root)

    pixiGlobal.init()
    pixiInput.init()

    this.ticker = new Ticker()
    this.ticker.autoStart = true
    this.ticker.add(this.update)

    adapt.init(this.canvas, () => {
      this.onResize()
    })
    this.root.scale.set(1 / adapt.dpr)

    await debugUtil.init()

    this.runTest()
  }

  runTest() {
    pixiTest.init()
  }

  cleanRoot() {
    this.root.removeChildren()

    // NOTE: 不能换引用，test 代码会应用旧的对象
    //  目前内部api没有removeAll，只能手动清除
    this.ticker['_head'].next = null
  }

  destroy() {
    this.isInited = false
    adapt.destroy()
    this.cleanRoot()

    this.app.destroy(true, true)
    this.app = null
    this.canvas = null
    this.stage = null
    this.root = null
  }

  update(delta: number) {
    pixiInput.update(delta)
    pixiTest.update(delta)
  }

  onResize() {
    // TODO: 一开始不应该调用一次 onResize 的
    const width = adapt.cssWidth
    const height = adapt.cssHeight
    this.app.renderer.resize(width, height)
    this.root.position.set(width / 2, height / 2)

    pixiInput.onResize()
  }
}

export const pixiEntry = new PixiEntry()

/**
 * 热更新
 *
 * reload是最好的做法
 * 不过为了极致的dev体验，hmr用了destroy
 * 比如修改了application 入参，还是需要destroy重新执行
 */
// if (import.meta.hot) {
//   import.meta.hot.accept(() => {
//     window.location.reload();
//   });
// }
