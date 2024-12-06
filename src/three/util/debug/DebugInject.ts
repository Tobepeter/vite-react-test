import { Object3D } from 'three'
import { threeEntry } from '../../ThreeEntry'
import { debugHelper } from './DebugHelper'

class DebugInject {
  async init() {
    await threeEntry.init()
    this.injectCommon()
  }

  injectCommon() {
    Object.defineProperty(Object3D.prototype, 'toggle', {
      get: function () {
        this.visible = !this.visible
        return this
      },
    })

    Object.defineProperty(Object3D.prototype, 'printTree', {
      get: function () {
        console.log(debugHelper.getTreeStr(this))
      },
    })

    Object.defineProperty(Object3D.prototype, 'chs', {
      get: function () {
        return this.children
      },
    })

    for (let i = 0; i < 10; i++) {
      Object.defineProperty(Object3D.prototype, `ch${i}`, {
        get: function () {
          return this.children[i]
        },
      })
    }
  }
}

export const debugInject = new DebugInject()
