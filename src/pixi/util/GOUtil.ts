import { Container, Sprite, Text, Texture } from 'pixi.js'

/**
 * 游戏对象工具类
 *
 * @desc 用代码创建的对象台繁琐了，聚合一下API
 */
class GOUtil {
  getCntr(name: string, parent?: Container): Container {
    const cntr = new Container()
    cntr.name = name
    if (parent) {
      // TODO: 这个类型很奇怪
      parent.addChild(cntr as any)
    }
    return cntr
  }

  getSprite(name: string, parent?: Container, textureKey?: string) {
    const sprite = new Sprite()
    sprite.name = name
    if (parent) {
      parent.addChild(sprite as any)
    }
    if (textureKey) {
      sprite.texture = Texture.from(textureKey)
    }
    return sprite
  }

  getText(name: string, parent?: Container, str?: string) {
    const text = new Text(str)
    text.name = name
    if (parent) {
      parent.addChild(text as any)
    }
    return text
  }
}

export const goUtil = new GOUtil()
