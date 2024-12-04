import {
  Container,
  DisplayObject,
  Graphics,
  IPointData,
  Point,
  Sprite,
  Text,
} from 'pixi.js'
import { boundUtil } from '../BoundUtil'
import { debugHelper } from './DebugHelper'

/**
 * 可视化的一些调试工具
 */
class DebugVisual {
  domKey = 'debug-visual'
  dom: HTMLDivElement
  rectName = 'debug-rect'

  init() {
    this.initDom()
  }

  initDom() {
    const dom = document.createElement('div')
    dom.id = this.domKey
    document.body.appendChild(dom)
    this.dom = dom

    dom.style.position = 'fixed'
    dom.style.pointerEvents = 'none'
    dom.style.top = '0'
    dom.style.left = '0'
  }

  /**
   * 直接在dom上添加按钮和测试函数执行
   */
  addButtons(btns: DebugVisualBtnList, opt?: DebugVisualOpt) {
    // -- 计算坐标 --
    let x = -1
    let y = -1
    if (opt) {
      if (opt && 'pos' in opt) {
        x = opt.pos.x
        y = opt.pos.y
      } else {
        const point = opt as IPointData
        x = point.x
        y = point.y
      }
    } else {
      // auto determine position
      x = window.innerWidth / 2 + 200
      y = window.innerHeight / 2
    }

    // -- wrapper --
    const wrapper = document.createElement('div')
    wrapper.style.position = 'absolute'
    wrapper.style.pointerEvents = 'auto'
    wrapper.style.display = 'flex'
    wrapper.style.flexDirection = 'column'
    wrapper.style.zIndex = '10000'
    wrapper.style.opacity = '0.8'
    this.dom.appendChild(wrapper)

    wrapper.style.left = `${x}px`
    wrapper.style.top = `${y}px`

    if (opt && 'style' in opt) {
      const style = opt.style
      if (style) {
        Object.assign(wrapper.style, style)
      }
    }

    // -- buttons --
    for (let i = 0; i < btns.length; i++) {
      const btn = btns[i]
      let fn: Function, name: string
      if (typeof btn === 'function') {
        fn = btn
        name = `btn-${i}`
      } else {
        fn = btn.fn
        name = btn.name
      }

      const btnDom = document.createElement('button')
      btnDom.innerText = name
      btnDom.onclick = fn as any
      wrapper.appendChild(btnDom)
    }
  }

  /** 小矩形，常用于定位和测量 */
  getRect(opt?: {
    size?: number
    alpha?: number
    width?: number
    height?: number
    center?: boolean
    color?: number
  }) {
    opt = opt || {}
    const size = opt.size ?? 50
    const alpha = opt.alpha ?? 0.5
    const width = opt.width ?? size
    const height = opt.height ?? size
    const center = opt.center ?? false
    let color = opt.color
    if (color == undefined || color < 0) {
      color = Math.floor(Math.random() * 0xffffff)
    }

    const root = new Container()
    const rect = new Graphics()
    rect.beginFill(color, alpha)
    const x = center ? -width / 2 : 0
    const y = center ? -height / 2 : 0
    rect.drawRect(x, y, width, height)
    rect.endFill()
    root.addChild(rect)
    return root
  }

  /** 绘制相对父级内容区域 */
  drawBound(obj: DisplayObject, color?: number) {
    const bound = boundUtil.getParentRect(obj)

    const rect = this.getRect({
      width: bound.width,
      height: bound.height,
      center: false,
      color,
    })
    obj.parent.addChild(rect)
    rect.x = bound.x
    rect.y = bound.y
  }

  drawSize(obj: Container, color?: number) {
    const scaleW = obj.width * obj.scale.x
    const scaleH = obj.height * obj.scale.y
    const rect = this.getRect({
      width: obj.width,
      height: scaleH,
      center: false,
      color,
    })
    obj.parent.addChild(rect)
    rect.x = obj.x
    rect.y = obj.y

    // TODO: 暂时不考虑旋转
    const anchorObj = obj as Sprite | Text
    if (anchorObj.anchor) {
      rect.x -= anchorObj.anchor.x * scaleW
      rect.y -= anchorObj.anchor.y * scaleH
    }
  }

  /**
   * 在对象的特定坐标绘制一个Axis
   */
  drawAxis(obj: Container, pos?: Point) {
    const len = 300
    const thickness = 2
    const alpha = 0.5

    const root = new Container()
    const g = new Graphics()

    // 画 X 轴 (红色)
    g.lineStyle(thickness, '#ff0000', alpha)
    g.moveTo(-len / 2, 0)
    g.lineTo(len / 2, 0)

    // 画 Y 轴 (绿色)
    g.lineStyle(thickness, '#00ff00', alpha)
    g.moveTo(0, -len / 2)
    g.lineTo(0, len / 2)

    root.addChild(g)
    if (pos) {
      root.position.copyFrom(pos)
    }
    obj.addChild(root)
    return root
  }

  /**
   * 在容器内展示小方块
   * 用于定位一个坐标
   *
   * @param parent 展示的容器，默认是舞台
   * @desc 由于自身可能存在缩放，visible，所以一般添加到parent上去看，坐标也是相对于自己
   */
  showRect(pos: Point, parent?: Container) {
    const rect = this.getRect()
    rect.name = this.rectName
    parent = parent || pixiEntry.stage
    parent.addChild(rect)
    rect.position.copyFrom(pos)
  }

  /**
   * 在dom内展示一个小方块
   * @param parent 展示的dom容器，默认是body
   */
  showDomPos(pos: Point, parent?: HTMLElement) {
    parent = parent || document.body

    const size = 10
    const color = '#ffffff'
    const x = pos.x - size / 2
    const y = pos.y - size / 2
    const div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.left = `${x}px`
    div.style.top = `${y}px`
    div.style.width = `${size}px`
    div.style.height = `${size}px`
    div.style.color = color
    div.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'
    div.id = 'debug_helper_div'
    ;(window as any).debug_helper_div = div
    parent.appendChild(div)
  }

  forceShowCanvas(canvas: HTMLCanvasElement, setSizeStyle = true) {
    canvas.style.position = 'absolute'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.zIndex = '10000'
    this.dom.appendChild(canvas)

    if (setSizeStyle) {
      const cssSize = 100
      if (setSizeStyle) {
        canvas.style.width = `${cssSize}px`
        canvas.style.height = `${cssSize}px`
      }
    }
  }
}

export type DebugVisualBtnConfig = {
  fn: (...args: any[]) => void
  name?: string
}

export type DebugVisualBtnList =
  | DebugVisualBtnConfig[]
  | ((...args: any[]) => void)[]

export type DebugVisualOpt =
  | IPointData
  | {
      pos?: IPointData
      style?: Partial<CSSStyleDeclaration>
    }

export const debugVisual = new DebugVisual()
