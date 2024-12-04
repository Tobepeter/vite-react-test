import { DisplayObject, Ticker } from 'pixi.js'

import { debugHelper } from './DebugHelper'
import { debugVisual } from './DebugVisual'

class DebugInject {
  init() {
    this.injectCommon()
    this.injectVisualRect()
    this.injectTicker()
  }

  injectCommon() {
    Object.defineProperty(DisplayObject.prototype, 'toggle', {
      get: function () {
        this.visible = !this.visible
        return this
      },
      enumerable: false,
      configurable: true,
    })

    Object.defineProperty(DisplayObject.prototype, 'printTree', {
      get: function () {
        // NOTE: 直接打印，不然返回字符串控制台会展示 \n
        console.log(debugHelper.getTreeStr(this))
      },
      enumerable: false,
      configurable: true,
    })

    Object.defineProperty(DisplayObject.prototype, 'chs', {
      get: function () {
        return this.children
      },
      enumerable: false,
      configurable: true,
    })

    for (let i = 0; i < 10; i++) {
      Object.defineProperty(DisplayObject.prototype, `ch${i}`, {
        get: function () {
          return this.children[i]
        },
      })
    }
  }

  injectVisualRect() {
    const rectName = debugVisual.rectName

    Object.defineProperty(DisplayObject.prototype, 'showPosRect', {
      get: function () {
        if (!this.parent) return null
        return this.parent.getChildByName(rectName)
      },
    })

    Object.defineProperty(DisplayObject.prototype, 'showPos', {
      get: function () {
        if (!this.showPosRect) {
          debugVisual.showRect(this.position, this.parent)
        }
      },
    })

    Object.defineProperty(DisplayObject.prototype, 'hidePos', {
      get: function () {
        if (!this.parent) return
        const rect = this.showPosRect
        if (rect) {
          rect.destroy()
        }
      },
    })

    Object.defineProperty(DisplayObject.prototype, 'togglePos', {
      get: function () {
        if (!this.parent) return
        const rect = this.showPosRect
        if (rect) {
          this.hidePos
        } else {
          this.showPos
        }
      },
    })
  }

  injectTicker() {
    Object.defineProperty(Ticker.prototype, 'isRunning', {
      get: function () {
        return this._requestID > 0
      },
    })

    Object.defineProperty(Ticker.prototype, 'all', {
      get: function () {
        // 排除head的所有next
        const all = []
        let next = this._head.next
        while (next) {
          all.push(next)
          next = next.next
        }
        return all
      },
    })

    Object.defineProperty(Ticker.prototype, 'allFn', {
      get: function () {
        return this.all.map((item) => item.fn)
      },
    })

    for (let i = 0; i < 10; i++) {
      Object.defineProperty(Ticker.prototype, `fn${i}`, {
        get: function () {
          return this.allFn[i]
        },
      })
    }
  }
}

export const debugInject = new DebugInject()
