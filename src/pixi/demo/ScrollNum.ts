import { ITest } from '../util/ITest'
import { gsap } from 'gsap'
import { Container, Text, TextStyle, TextMetrics, Graphics, Sprite, Texture } from 'pixi.js'

class ScrollNum implements ITest {
  cntr: Container
  cntrMask: Graphics
  scrollCntr: Container
  numbers: Container[] = []
  isAnimating = false
  currentNumber = 0
  targetNumber = 0

  textStyle = new TextStyle({
    fontSize: 32,
    fill: 0x000000,
  })

  width = 100
  height = 200

  init() {
    this.setup()
    this.updateSize()

    // TEST
    win.scrollNum = this

    setTimeout(() => {
      this.setNum(2)
    }, 1000)
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
    const mask = new PIXI.Graphics()
    this.cntrMask = mask
    cntr.addChild(mask)
    // cntr.mask = mask

    // 创建数字
    for (let i = 0; i < 11; i++) {
      let textStr = i + ''
      if (i === 10) textStr = '0'

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
    if (this.isAnimating) return
    this.isAnimating = true
    this.targetNumber = num

    // 计算目标位置
    const targetPos = -num * this.height

    // 如果目标数字大于9,需要先滚动到0再重置位置
    if (num > 9) {
      // 先滚动到0
      gsap.to(this.scrollCntr, {
        y: -10 * this.height, // 滚动到0的位置
        duration: 0.8,
        ease: 'bounce.out',
        onComplete: () => {
          // 瞬间重置到开始位置
          this.scrollCntr.y = 0
          // 再滚动到目标数字
          gsap.to(this.scrollCntr, {
            y: targetPos,
            duration: 0.2,
            ease: 'none',
            onComplete: () => {
              this.currentNumber = num
              this.isAnimating = false
            },
          })
        },
      })
    } else {
      // 正常滚动到目标位置
      gsap.to(this.scrollCntr, {
        y: targetPos,
        duration: 1,
        ease: 'bounce.out',
        onComplete: () => {
          this.currentNumber = num
          this.isAnimating = false
        },
      })
    }
  }

  destroy() {
    this.cntr.destroy({ children: true })
  }
}

export const scrollNum = new ScrollNum()
