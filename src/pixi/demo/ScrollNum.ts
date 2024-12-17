import { ITest } from '../util/ITest'
import { gsap } from 'gsap'
import { Container, Text, TextStyle, TextMetrics, Graphics, Sprite, Texture } from 'pixi.js'
import { Pane } from 'tweakpane'

class ScrollNum implements ITest {
  cntr: Container
  cntrMask: Graphics
  scrollCntr: Container
  numbers: Container[] = []
  currentNumber = 0

  textStyle = new TextStyle({
    fontSize: 32,
    fill: 0x000000,
  })

  width = 100
  height = 200

  duration = 0.5
  maxNum = 9

  private timeline: gsap.core.Timeline
  private pane: Pane

  init() {
    this.setup()
    this.updateSize()
    this.initPane()
    win.scrollNum = this
  }

  setup() {
    // 创建主容器
    const cntr = new Container()
    this.cntr = cntr
    pixiEntry.root.addChild(cntr)

    // 创建滚动容器
    const scrollCntr = new Container()
    this.scrollCntr = scrollCntr
    cntr.addChild(scrollCntr)

    // 创建遮罩
    const mask = new Graphics()
    this.cntrMask = mask
    cntr.addChild(mask)
    cntr.mask = mask

    // 创建数字
    const count = this.maxNum + 1
    const padCount = count + 1 // 尾部多一个填充
    for (let i = 0; i < padCount; i++) {
      let textStr = i + ''
      if (i === padCount - 1) textStr = '0'

      const textCntr = new Container()
      const sp = new Sprite(Texture.WHITE)
      textCntr.addChild(sp)

      const text = new Text(textStr, this.textStyle)
      text.anchor.set(0.5)
      textCntr.addChild(text)

      this.numbers.push(textCntr)
      scrollCntr.addChild(textCntr)
    }
  }

  updateSize() {
    // const metrics = TextMetrics.measureText('0', this.textStyle)
    // const textWidth = metrics.width
    // this.width = textWidth

    for (let i = 0; i < this.numbers.length; i++) {
      const numberCntr = this.numbers[i]
      numberCntr.position.y = i * this.height

      const sp = numberCntr.getChildAt(0) as Sprite
      sp.width = this.width
      sp.height = this.height

      const text = numberCntr.getChildAt(1) as Text
      text.position.set(this.width / 2, this.height / 2)
    }

    // 更新遮罩大小
    const mask = this.cntrMask
    mask.clear()
    mask.beginFill(0x000000)
    mask.drawRect(0, 0, this.width, this.height)
    mask.endFill()

    // 更新数字位置
    for (let i = 0; i < this.numbers.length; i++) {
      this.numbers[i].position.y = i * this.height
    }
  }

  setNum(num: number) {
    this.stopAni()

    const dur = this.duration
    const targetPos = -num * this.height
    const currPos = this.scrollCntr.y
    const maxPos = -(this.maxNum + 1) * this.height

    // 如果目标数字小于当前数字,需要先滚动到0再重置位置
    if (targetPos > currPos) {
      const distance = currPos - maxPos - targetPos
      const dur1 = ((currPos - maxPos) / distance) * dur
      const dur2 = dur - dur1

      this.timeline = gsap
        .timeline()
        .to(this.scrollCntr, {
          y: maxPos,
          duration: dur1,
        })
        .call(() => {
          this.scrollCntr.y = 0
        })
        .to(this.scrollCntr, {
          y: targetPos,
          duration: dur2,
        })
    } else {
      this.timeline = gsap.timeline().to(this.scrollCntr, {
        y: targetPos,
        duration: dur,
      })
    }

    this.currentNumber = num
  }

  initPane() {
    const pane = new Pane()
    this.pane = pane

    const options: object = {}
    for (let i = 0; i <= this.maxNum; i++) {
      options[i] = i
    }

    pane
      .addBinding({ number: 0 }, 'number', {
        options,
      })
      .on('change', ev => {
        this.setNum(ev.value)
      })
  }

  stopAni() {
    if (this.timeline) {
      this.timeline.kill()
      this.timeline = null
    }
  }

  destroy() {
    this.stopAni()
    this.pane.dispose()
  }
}

export const scrollNum = new ScrollNum()
