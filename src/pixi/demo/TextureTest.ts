import { Sprite, Texture } from 'pixi.js'
import { ITest } from '../util/ITest'
import { Random } from 'mockjs'
import { debugTexture } from '../util/debug/DebugTexture'

class TextureTest implements ITest {
  url = ''
  sp: Sprite
  texture: Texture

  init() {
    // TODO: 会跨域
    // const url = debugTexture.bunnyUrl
    // const url = debugTexture.dummyImage

    const sp = new Sprite()
    this.sp = sp
    const range = 500
    sp.x = Random.float(-range, range)
    sp.y = Random.float(-range, range)
    pixiEntry.root.addChild(sp)
    this.changeRandomUrl()

    win.sp = sp

    const pane = new win.Tweakpane.Pane()
    pane
      .addButton({ title: '改变url' })
      .on('click', () => this.changeRandomUrl())
  }

  changeRandomUrl() {
    const url = debugTexture.getRandomDummyImg()
    this.url = url
    const texture = Texture.from(url)
    this.texture = texture
    if (texture.valid) {
      console.log('texture valid')
      this.sp.texture = texture
    } else {
      texture.baseTexture.on('loaded', () => {
        console.log('texture loaded')

        // 如果精灵被销毁了，则不设置
        if (this.sp['_destroyed']) {
          return
        }

        // 注意，永远用最新的值
        this.sp.texture = this.texture
      })
    }
  }
}

export const textureTest = new TextureTest()
