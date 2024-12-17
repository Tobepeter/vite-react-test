import { ITest } from '../util/ITest'
import { gsap } from 'gsap'
import { Container, Text, TextStyle, TextMetrics, Graphics, Sprite, Texture } from 'pixi.js'
import { Pane } from 'tweakpane'

/**
 * 多列数字滚动
 *
 * @desc 使用大的Texture包裹，文字之间复用
 */
class ScrollNumTexture implements ITest {
  cntr: Container
  adaptCntr: Container // 自动居中的容器
  bg: Graphics
  viewport: Container
  viewMask: Graphics
  scrollerSpList: Sprite[] = []

  textStyle = {
    fontSize: 32,
    fill: '#ffffff',
  }

  itemWidth = 100
  itemHeight = 200
  duration = 0.5
  maxNum = 9

  numberTexture: Texture
  viewportWidth = 0
  viewportHeight = 0
  currentNumber = 0
  numCount = 0

  private pane: Pane

  init() {
    this.createNumbersTexture()
    this.setup()
    this.initPane()
  }

  createNumbersTexture() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = this.itemWidth
    canvas.height = this.itemHeight * (this.maxNum + 2) // 多一个用于循环

    ctx.font = `${this.textStyle.fontSize}px Arial`
    ctx.fillStyle = this.textStyle.fill
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    for (let i = 0; i <= this.maxNum + 1; i++) {
      let num = i
      if (i === this.maxNum + 1) num = 0 // 最后一个数字显示0用于循环

      const centerX = this.itemWidth / 2
      const centerY = i * this.itemHeight + this.itemHeight / 2
      ctx.fillText(num.toString(), centerX, centerY)
    }

    this.numberTexture = Texture.from(canvas)
  }

  setup() {
    const cntr = new Container()
    this.cntr = cntr
    pixiEntry.root.addChild(cntr)

    const adaptCntr = new Container()
    this.adaptCntr = adaptCntr
    cntr.addChild(adaptCntr)

    const bg = new Graphics()
    bg.beginFill('#8A2BE2')
    bg.drawRect(0, 0, this.itemWidth, this.itemHeight)
    bg.endFill()
    this.bg = bg
    adaptCntr.addChild(bg)

    const viewport = new Container()
    this.viewport = viewport
    adaptCntr.addChild(viewport)

    const mask = new Graphics()
    this.viewMask = mask
    mask.beginFill(0x000000)
    mask.drawRect(0, 0, this.itemWidth, this.itemHeight)
    mask.endFill()
    viewport.addChild(mask)
    viewport.mask = mask

    this.forceNumAuto(0)
  }

  setSpriteText(textNum: number, spritIndex: number, noAni: boolean = false) {
    const scrollSp = this.scrollerSpList[spritIndex]
    const dur = this.duration
    const targetPos = -textNum * this.itemHeight
    const currPos = scrollSp.y
    const maxPos = -(this.maxNum + 1) * this.itemHeight
    this.currentNumber = textNum

    if (noAni) {
      scrollSp.y = targetPos
      return
    }

    // 如果目标数字小于当前数字,需要先滚动到0再重置位置
    if (targetPos > currPos) {
      const distance = currPos - maxPos - targetPos
      const dur1 = ((currPos - maxPos) / distance) * dur
      const dur2 = dur - dur1

      gsap
        .timeline()
        .to(scrollSp, {
          y: maxPos,
          duration: dur1,
        })
        .call(() => {
          scrollSp.y = 0
        })
        .to(scrollSp, {
          y: targetPos,
          duration: dur2,
        })
    } else {
      gsap.timeline().to(scrollSp, {
        y: targetPos,
        duration: dur,
      })
    }
  }

  getValidNum(num: number) {
    if (num < 0 || isNaN(num)) return 0

    num = Math.floor(num)
    return num
  }

  setNum(num: number) {
    this.setNumOpt(num, { autoAddNumCount: false, autoRemoveNumCount: false })
  }

  setNumAuto(num: number) {
    this.setNumOpt(num, { autoAddNumCount: true, autoRemoveNumCount: false })
  }

  forceNumAuto(num: number) {
    this.setNumOpt(num, { noAni: true, autoAddNumCount: true, autoRemoveNumCount: true })
  }

  forceNum(num: number) {
    this.setNumOpt(num, { noAni: true })
  }

  /**
   * 设置数字
   *
   * @params {opt.noAni} 是否不使用动画
   * @params {opt.autoAddNumCount} 是否自动增加数字位数
   * @params {opt.autoRemoveNumCount} 是否自动减少数字位数
   *
   * TODO: 目前数字滚动有点问题，比如从 23->3，只是简单的移动2，实际上没有模拟数字真实的过渡效果
   */
  setNumOpt(num: number, opt: { noAni?: boolean; autoAddNumCount?: boolean; autoRemoveNumCount?: boolean }) {
    this.stopAni()

    const noAni = opt.noAni ?? false
    const autoAddNumCount = opt.autoAddNumCount ?? false
    const autoRemoveNumCount = opt.autoRemoveNumCount ?? false

    // -- 有效数字位数 --
    num = this.getValidNum(num)
    const count = num.toString().length
    let targetCount = count
    if (!autoAddNumCount && targetCount > this.numCount) {
      targetCount = this.numCount
    }
    if (!autoRemoveNumCount && targetCount < this.numCount) {
      targetCount = this.numCount
    }
    this.setNumCount(targetCount)

    // -- 设置数字 --
    const numStr = this.formatNum(num, targetCount)
    for (let i = 0; i < targetCount; i++) {
      const textNum = parseInt(numStr[i])
      this.setSpriteText(textNum, i, noAni)
    }
  }

  formatNum(num: number, count: number) {
    const numStr = num.toString()
    let result = numStr

    // 如果长度超出，截断开头部分
    if (numStr.length > count) {
      result = numStr.slice(-count)
    }

    // 如果长度不足，补齐开头部分
    if (numStr.length < count) {
      result = numStr.padStart(count, '0')
    }

    return result
  }

  setNumCount(count: number) {
    if (count === this.numCount) return
    // TODO: 可以适当保留原本的位数信息，而不是全部变成0

    this.numCount = count

    // -- scrollSprite --
    this.scrollerSpList.forEach(sp => sp.destroy())
    this.scrollerSpList = []

    for (let i = 0; i < count; i++) {
      const sprite = new Sprite(this.numberTexture)
      sprite.x = i * this.itemWidth
      this.scrollerSpList.push(sprite)
      this.viewport.addChild(sprite)
    }

    this.viewportWidth = count * this.itemWidth
    this.viewportHeight = this.itemHeight

    // -- mask --
    const mask = this.viewMask
    mask.clear()
    mask.beginFill(0x000000)
    mask.drawRect(0, 0, this.viewportWidth, this.viewportHeight)
    mask.endFill()

    // -- bg --
    this.bg.width = this.viewportWidth
    this.bg.height = this.viewportHeight

    // -- adaptCntr --
    const adaptCntr = this.adaptCntr
    adaptCntr.x = -this.viewportWidth / 2
    adaptCntr.y = -this.viewportHeight / 2
  }

  initPane() {
    const pane = new Pane()
    this.pane = pane

    // 数字 位数 自动模式 动画？
    const params = {
      number: '0',
      numCount: this.numCount + '',
      autoMode: true,
      noAni: false,
    }

    pane.addBinding(params, 'number', { label: '数字' }).on('change', ev => {
      const num = parseInt(ev.value)
      this.setNumOpt(num, {
        noAni: params.noAni,
        autoAddNumCount: params.autoMode,
        autoRemoveNumCount: params.autoMode,
      })

      params.numCount = this.numCount + ''
      pane.refresh()
    })

    const misc = pane.addFolder({ title: '其他设置', expanded: false })
    misc.addBinding(params, 'numCount', { label: '数字位数' }).on('change', ev => {
      const num = parseInt(ev.value)
      this.setNumCount(num)
    })
    misc.addBinding(params, 'autoMode', { label: '自动加减位数' }).on('change', ev => {
      params.autoMode = ev.value
    })
    misc.addBinding(params, 'noAni', { label: '不使用动画' }).on('change', ev => {
      params.noAni = ev.value
    })
  }

  stopAni() {
    for (const sp of this.scrollerSpList) {
      gsap.killTweensOf(sp)
    }
  }

  destroy() {
    this.stopAni()
    this.pane.dispose()
  }
}

export const scrollNumTexture = new ScrollNumTexture()
