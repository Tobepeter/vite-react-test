import { Container, Graphics, Text } from 'pixi.js'
import { ITest } from '../util/ITest'

class AdaptDemo implements ITest {
  // 适配层
  adaptRoot: Container

  // 设计层
  designWidth = 750
  designHeight = 1334

  // 内容
  content: Container

  // 强制原始分辨率的内容
  myView: Container

  init() {
    this.adaptRoot = new Container()
    pixiEntry.stage.addChild(this.adaptRoot)

    this.content = new Container()
    this.adaptRoot.addChild(this.content)

    this.addBaseContent()
    this.addContent()

    this.onResize()
    this.listenResize()
  }

  listenResize() {
    window.addEventListener('resize', this.onResize)
  }

  addBaseContent() {
    const bg = new Graphics()
    bg.beginFill(0xffffff)
    bg.drawRect(0, 0, this.designWidth, this.designHeight)
    bg.endFill()
    this.content.addChild(bg)

    const text = new Text()
    text.text = `${this.designWidth}x${this.designHeight}`
    text.anchor.set(0.5)
    text.position.set(this.designWidth / 2, this.designHeight / 2)
    this.content.addChild(text)
  }

  addContent() {
    const myView = new Container()
    this.content.addChild(myView)
    this.myView = myView

    const W = this.designHeight
    const H = this.designWidth
    const rect = new Graphics()
    rect.alpha = 0.5
    rect.beginFill(0xff0000)
    rect.drawRect(0, 0, W, H)
    rect.endFill()
    myView.addChild(rect)

    this.adaptContent()
  }

  adaptContent() {
    const scale = this.designWidth / this.designHeight
    this.myView.scale.set(scale)

    const wrapperHeight = this.designHeight
    const itemHeight = this.designWidth * scale
    const x = 0
    const y = (wrapperHeight - itemHeight) / 2
    this.myView.position.set(x, y)
  }

  clear() {
    window.removeEventListener('resize', this.onResize)
    this.adaptRoot.destroy()
  }

  onResize = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    const scale = Math.min(width / this.designWidth, height / this.designHeight)

    const x = (width - this.designWidth * scale) / 2
    const y = (height - this.designHeight * scale) / 2

    this.adaptRoot.scale.set(scale)
    this.adaptRoot.position.set(x, y)
  }
}

export const adaptDemo = new AdaptDemo()
