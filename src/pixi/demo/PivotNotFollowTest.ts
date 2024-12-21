import { Graphics, Point } from 'pixi.js'
import { ITest } from '../util/ITest'
import { Pane } from 'tweakpane'

/**
 * 模仿cocos修改pivot功能
 *
 * @desc 只影响渲染中心，不影响子节点的定位中心
 */
class PivotNotFollowTest implements ITest {
  sp1: Graphics
  sp2: Graphics

  private pane: Pane

  private sp2Pos = new Point(0, 0)

  init() {
    const sp1 = new Graphics()
    this.sp1 = sp1
    sp1.beginFill(0xff0000)
    sp1.drawRect(-50, -50, 100, 100)
    sp1.endFill()
    pixiEntry.root.addChild(sp1)

    const sp2 = new Graphics()
    this.sp2 = sp2
    sp2.beginFill(0x00ff00)
    sp2.drawRect(0, 0, 100, 100)
    sp2.position.set(100, 100)
    sp2.endFill()
    sp1.addChild(sp2)

    // 记录sp2，在父节点没有pivot下的位置
    this.sp2Pos.set(sp2.x - sp1.pivot.x, sp2.y - sp1.pivot.y)

    this.initPane()
  }

  initPane() {
    this.pane = new Pane()

    const params = {
      pivotX: 0,
      pivotY: 0,
    } satisfies Record<string, number>
    this.pane
      .addBinding(params, 'pivotX', {
        label: 'pivotX',
        min: -100,
        max: 100,
      })
      .on('change', () => {
        this.setPivot(params.pivotX, params.pivotY)
      })

    this.pane
      .addBinding(params, 'pivotY', {
        label: 'pivotY',
        min: -100,
        max: 100,
      })
      .on('change', () => {
        this.setPivot(params.pivotX, params.pivotY)
      })
  }

  setPivot(x: number, y: number) {
    this.sp1.pivot.set(x, y)

    this.sp2.x = this.sp2Pos.x + x
    this.sp2.y = this.sp2Pos.y + y
  }

  clear() {
    this.pane.dispose()
  }
}

export const pivotNotFollowTest = new PivotNotFollowTest()
