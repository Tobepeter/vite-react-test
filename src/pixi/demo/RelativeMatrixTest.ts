import { Container, Graphics, Rectangle } from 'pixi.js'
import { debugVisual } from '../util/debug/DebugVisual'
import { ITest } from '../util/ITest'
import { transUtil } from '../util/TransUtil'
import { boundUtil } from '../util/BoundUtil'

/**
 * 测试相对矩阵
 */
class RelativeMatrixTest implements ITest {
  init() {
    const cntr = new Container()
    cntr.position.set(100, 100)
    pixiEntry.root.addChild(cntr)

    const cntr2 = new Container()
    cntr2.position.set(100, 100)
    cntr2.scale.set(0.5)
    cntr.addChild(cntr2)

    const width = 100
    const height = 100
    const x = 100
    const y = 100
    const rect = new Graphics()
    rect.beginFill(0xff0000)
    rect.position.set(x, y)
    rect.drawRect(0, 0, width, height)
    rect.endFill()
    cntr2.addChild(rect)

    const relativeMatrix = transUtil.getRelativeMatrix(rect, cntr)

    // NOTE: 注意，使用本地坐标系就不要考虑自己的坐标了
    // const fromRect = new Rectangle(x, y, width, height)
    const fromRect = new Rectangle(0, 0, width, height)
    const toRect = boundUtil.transformRect(fromRect, relativeMatrix)
    debugVisual.showRect(toRect, cntr)
  }
}

export const relativeMatrixTest = new RelativeMatrixTest()
