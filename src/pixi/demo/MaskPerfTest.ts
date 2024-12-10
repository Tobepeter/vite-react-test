import { Sprite } from 'pixi.js'
import { ITest } from '../util/ITest'
import { debugTexture } from '../util/debug/DebugTexture'
import { scriptLoader } from '../util/ScriptLoader'
import { Random } from 'mockjs'

/**
 * Mask性能测试
 *
 * 测试版本 v7
 * 经过测试，使用mask性能非常差
 */
class MaskPerfTest implements ITest {
  size = 50
  useMask = true
  count = 300
  range = 800
  cacheAsBitmap = true
  spList: Sprite[] = []
  pane: any

  init() {
    const pane = new win.Tweakpane.Pane()
    this.pane = pane

    scriptLoader.showStats()

    // 数量
    const countList = [200, 300, 500]
    const countLabel = 'count'
    for (let i = 0; i < countList.length; i++) {
      const count = countList[i]
      pane.addButton({ title: `${count}个` }).on('click', () => {
        this.count = count
        this.createSprites()
      })
    }

    // 缓存位图
    pane
      .addInput({ cacheAsBitmap: this.cacheAsBitmap }, 'cacheAsBitmap', {
        label: '缓存为位图',
      })
      .on('change', ev => {
        this.cacheAsBitmap = ev.value
        this.updateCacheAsBitmap()
      })

    this.createSprites()
  }

  createSprites() {
    this.clearSpList()

    const { count, range } = this

    for (let i = 0; i < count; i++) {
      const sp = this.createSp()
      sp.x = Random.float(-range, range)
      sp.y = Random.float(-range, range)
      this.spList.push(sp)
    }
  }

  updateCacheAsBitmap() {
    this.spList.forEach(sp => {
      sp.cacheAsBitmap = this.cacheAsBitmap
    })
  }

  createSp() {
    // scriptLoader.showStats()

    const sp = new Sprite()
    sp.texture = debugTexture.getChessboardTexture(50, 256)
    pixiEntry.root.addChild(sp)
    sp.anchor.set(0.5)
    sp.width = this.size
    sp.height = this.size

    if (this.useMask) {
      const mask = new Sprite()
      mask.texture = debugTexture.getCircleTexture()
      sp.mask = mask
      mask.anchor.set(0.5)
      sp.addChild(mask)
    }

    sp.cacheAsBitmap = this.cacheAsBitmap

    return sp
  }

  clearSpList() {
    this.spList.forEach(sp => {
      sp.destroy()
    })
    this.spList = []
  }

  clear() {
    this.clearSpList()
    this.spList = []

    this.pane.dispose()
    this.pane = null
  }
}

export const maskPerfTest = new MaskPerfTest()
