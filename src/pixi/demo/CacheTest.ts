import { IPoint, Point, Sprite } from 'pixi.js'
import { ITest } from '../util/ITest'
import { debugTexture } from '../util/debug/DebugTexture'

class CacheTest implements ITest {
  init() {
    // this.testWorldPos()
    this.testCacheChange()
  }

  async testWorldPos() {
    const size = 256

    const sp = new Sprite()
    sp.texture = debugTexture.getChessboardTexture(50, size)
    pixiEntry.root.addChild(sp)
    sp.anchor.set(0.5)
    sp.width = size
    sp.height = size

    const spImg = new Sprite()
    spImg.texture = debugTexture.colorTextureMap.red
    sp.addChild(spImg)
    spImg.anchor.set(0.5)
    spImg.width = 10
    spImg.height = 10

    // NOTE: 经过测试，在没有render之前，坐标是不准的，在0，0
    console.log('没渲染前')
    this.printWorldPos(spImg)
    await nextFrame()
    console.log('渲染后')
    this.printWorldPos(spImg)

    win.sp = sp
    win.cacheTest = this

    await sleep(100)

    const mask = new Sprite()
    mask.texture = debugTexture.getCircleTexture()
    sp.mask = mask
    mask.anchor.set(0.5)
    sp.addChild(mask)
    sp.cacheAsBitmap = true

    console.log('设置cacheAsBitmap后')
    this.printWorldPos(spImg)
    await nextFrame()

    // NOTE: 经过测试，设置cacheAsBitmap后，坐标会被污染为 0,0
    console.log('设置cacheAsBitmap后，渲染后')
    this.printWorldPos(spImg)

    sp.x -= 200
    await nextFrame()
    console.log('移动后渲染')
    this.printWorldPos(spImg)
    spImg.updateTransform()
    console.log('移动后updateTransform')
    this.printWorldPos(spImg)
  }

  async testCacheChange() {
    const sp = new Sprite()
    sp.texture = debugTexture.colorTextureMap.red
    pixiEntry.root.addChild(sp)
    sp.anchor.set(0.5)
    sp.width = 256
    sp.height = 256

    const mask = new Sprite()
    mask.texture = debugTexture.getCircleTexture()
    sp.mask = mask
    mask.anchor.set(0.5)
    sp.addChild(mask)

    sp.cacheAsBitmap = true
    await nextFrame()

    // NOTE: 需要临时设置为false，否则不会重新渲染
    sp.cacheAsBitmap = false
    sp.texture = debugTexture.colorTextureMap.green
    sp.cacheAsBitmap = true
  }

  printWorldPos(sp: Sprite) {
    const worldTransform = sp.transform.worldTransform
    const pos = new Point(worldTransform.tx, worldTransform.ty)
    console.log({ x: pos.x, y: pos.y })
  }
}

export const cacheTest = new CacheTest()
