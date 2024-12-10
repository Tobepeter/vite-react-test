import { Graphics } from 'pixi.js'

class GraphicsCacheTest {
  init() {
    const rect = new Graphics()
    rect.beginFill(0xff0000)
    rect.drawRect(0, 0, 100, 100)
    rect.endFill()
    pixiEntry.root.addChild(rect)

    win.rect = rect
  }
}

export const graphicsCacheTest = new GraphicsCacheTest()
