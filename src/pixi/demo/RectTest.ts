import { ITest } from '../util/ITest'

class RectTest implements ITest {
  init() {
    const rect = new PIXI.Graphics()

    const color = Math.random() * 0xffffff
    rect.beginFill(color)

    const size = 100
    rect.drawRect(-size / 2, -size / 2, size, size)
    rect.endFill()
    pixiEntry.root.addChild(rect)
    // pixiEntry.stage.addChild(rect);
  }
}

export const rectTest = new RectTest()
