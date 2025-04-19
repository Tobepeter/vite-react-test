import { AnimatedSprite } from 'pixi.js'
import { debugTexture } from '../util/debug/DebugTexture'
import { ITest } from '../util/ITest'
import { scriptLoader } from '../util/ScriptLoader'

class AnimationSpriteDemo implements ITest {
  init() {
    // 创建一个精灵动画
    const textures = []

    Object.values(debugTexture.colorTextureMap).forEach(texture => {
      textures.push(texture)
    })

    // 创建动画精灵
    const animatedSprite = new AnimatedSprite(textures)
    animatedSprite.anchor.set(0.5)
    animatedSprite.animationSpeed = 0.1 // 动画速度
    animatedSprite.play() // 播放动画

    pixiEntry.root.addChild(animatedSprite)

    // 添加控制面板
    const pane = new win.Tweakpane.Pane()
    pane.addInput(animatedSprite, 'animationSpeed', {
      min: 0.01,
      max: 1,
      label: '动画速度',
    })

    // 添加播放控制按钮
    pane.addButton({ title: '播放' }).on('click', () => animatedSprite.play())
    pane.addButton({ title: '暂停' }).on('click', () => animatedSprite.stop())

    // 加载性能监控
    scriptLoader.showStats()
  }
}

export const animationSpriteDemo = new AnimationSpriteDemo()
