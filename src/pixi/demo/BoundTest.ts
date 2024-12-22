import { Container, Graphics } from 'pixi.js'
import { debugVisual } from '../util/debug/DebugVisual'
import { ITest } from '../util/ITest'

/**
 * 测试bound和dom交互
 */
class BoundTest implements ITest {
  init() {
    const cntr = new Container()
    cntr.position.set(100, 100)
    cntr.scale.set(0.5)
    pixiEntry.root.addChild(cntr)

    const rect = new Graphics()
    rect.beginFill(0xff0000)
    rect.drawRect(0, 0, 100, 100)
    rect.endFill()
    cntr.addChild(rect)

    const bound = rect.getBounds()
    debugVisual.showDomRect(bound)
  }
}

export const boundTest = new BoundTest()
