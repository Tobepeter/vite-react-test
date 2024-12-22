import { DisplayObject, Matrix, Ticker } from 'pixi.js'

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

    const getMatrixStr = (m: Matrix) => {
      const f2 = (v: number) => v.toFixed(2)
      return `[${f2(m.a)}, ${f2(m.b)}, ${f2(m.c)}, ${f2(m.d)}, ${f2(m.tx)}, ${f2(m.ty)}]`
    }

    Object.defineProperty(DisplayObject.prototype, 'matStr', {
      get: function () {
        return getMatrixStr(this.transform.localTransform)
      },
    })

    Object.defineProperty(DisplayObject.prototype, 'worldMatStr', {
      get: function () {
        return getMatrixStr(this.transform.worldTransform)
      },
    })

    Object.defineProperty(DisplayObject.prototype, 'printMatStrChain', {
      get: function () {
        let str = this.matStr
        let parent = this.parent
        while (parent) {
          // += \n
          str += '\n' + parent.matStr
          parent = parent.parent
        }
        console.log(str)
      },
    })

    Object.defineProperty(DisplayObject.prototype, 'printWorldMatStrChain', {
      get: function () {
        let name: string
        name = this.name || this.constructor.name.toLowerCase()
        let str = `${name}: ${this.worldMatStr}`
        let parent = this.parent
        while (parent) {
          name = parent.name || parent.constructor.name.toLowerCase()
          str += '\n' + `${name}: ${parent.worldMatStr}`
          parent = parent.parent
        }
        console.log(str)
      },
    })
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
          debugVisual.showPos(this.position, this.parent)
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
        return this.all.map(item => item.fn)
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
