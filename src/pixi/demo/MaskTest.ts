import { Container, DisplayObject, Graphics, Sprite } from 'pixi.js'
import { ITest } from '../util/ITest'
import { debugTexture } from '../util/debug/DebugTexture'
import { Pane } from 'tweakpane'

/**
 * 遮罩测试
 *
 * [定位]     遮罩要注意anchor，因为anchor会影响到子节点的定位
 * [显示]     如果精灵节点作为mask使用，那么mask无论如何都是不可见的，哪怕是主体visible为false
 * [mask渲染] mask是否visible不会影响到正常的遮罩效果
 * [层级]     层级似乎并不重要
 *
 * [矢量显示]  矢量visbile会影响mask对象显示，不能关掉，但是作为mask时候本体不会展示
 */
class MaskTest implements ITest {
  pane: Pane

  init() {
    // this.maskAsChild()
    this.maskAsSibling()
  }

  maskAsChild() {
    const sp = new Sprite()
    sp.texture = debugTexture.getChessboardTexture()
    pixiEntry.root.addChild(sp)
    sp.anchor.set(0.5)

    const mask = new Sprite()
    mask.texture = debugTexture.getCircleTexture()
    mask.anchor.set(0.5)
    sp.mask = mask
    sp.addChild(mask)

    const pane = new Pane()
    pane.addButton({ title: 'toggle mask' }).on('click', () => {
      sp.mask = sp.mask ? null : mask
    })
    pane.addButton({ title: 'toggle mask visible' }).on('click', () => {
      mask.visible = !mask.visible
    })
    this.pane = pane
  }

  maskAsSibling() {
    const cntr = new Container()
    pixiEntry.root.addChild(cntr)
    const size = 256

    const sp = new Sprite()
    sp.texture = debugTexture.getChessboardTexture()
    sp.anchor.set(0.5)
    cntr.addChild(sp)

    const useGraphics = true
    let mask: Graphics | Sprite

    if (useGraphics) {
      mask = new Graphics()
      mask.beginFill(0xff0000)
      mask.drawCircle(0, 0, size / 2)
      mask.endFill()
    } else {
      mask = new Sprite()
      mask.texture = debugTexture.getCircleTexture()
    }

    sp.mask = mask

    sp.mask = mask
    if (!useGraphics) {
      ;(mask as Sprite).anchor.set(0.5)
    }

    // NOTE: 实际上还是挺常见的，比如头像修改了非原始宽高会导致缩放，而mask需要是原始宽高
    cntr.addChild(mask)

    const pane = new Pane()
    pane.addButton({ title: 'toggle mask' }).on('click', () => {
      sp.mask = sp.mask ? null : mask
    })
    pane.addButton({ title: 'toggle mask visible' }).on('click', () => {
      mask.visible = !mask.visible
    })
    pane.addButton({ title: 'toggle sp visible' }).on('click', () => {
      sp.visible = !sp.visible
    })
    pane.addButton({ title: 'toggle offset' }).on('click', () => {
      mask.position.x = mask.position.x === 0 ? 100 : 0
    })
    this.pane = pane
  }

  clear() {
    if (this.pane) {
      this.pane.dispose()
    }
  }
}

export const maskTest = new MaskTest()
