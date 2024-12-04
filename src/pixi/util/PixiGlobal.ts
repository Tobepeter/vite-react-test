import { pixiEntry } from '../PixiEntry'
import * as PIXI from 'pixi.js'
import { goUtil } from './GOUtil'
import { adapt } from './Adapt'

/**
 * 使用默认导入导入 PIXI
 *
 * 目前貌似还不能使用，虽然 tsconfig 配置了
 * esModuleInterop 和 allowSyntheticDefaultImports
 */
class PixiGlobal {
  init() {
    this.injectUnplugin()
    this.injectPixi()
    this.injectBasic()
  }

  /**
   * 注入一些高频使用对象
   * @desc 注意这些对象不要在static的部分使用，只能在runtime使用
   */
  private injectUnplugin() {
    win.pixiEntry = pixiEntry
    win.PIXI = PIXI

    win.goUtil = goUtil
    win.adapt = adapt
  }

  private injectPixi() {
    win.stage = pixiEntry.stage
    win.app = pixiEntry.app
    win.canvas = pixiEntry.canvas
    win.renderer = pixiEntry.app.renderer
  }

  private injectBasic() {
    win.ticker = pixiEntry.ticker
  }
}

export const pixiGlobal = new PixiGlobal()

declare global {
  const pixiEntry: typeof import('../PixiEntry').pixiEntry
  const PIXI: typeof import('pixi.js')
  const goUtil: typeof import('./GOUtil').goUtil
  const adapt: typeof import('./Adapt').adapt
}
