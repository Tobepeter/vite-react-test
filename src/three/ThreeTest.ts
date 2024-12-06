import { Clock } from 'three'
import { cubeTest } from './demo/CubeTest'
import { IThreeTest } from './util/IThreeTest'
import { gloomShader } from './demo/GloomShader'

class ThreeTest {
  curTest: IThreeTest = null
  testMap = {
    cubeTest,
    gloomShader,
  } satisfies Record<string, IThreeTest>

  clock = new Clock()

  init() {
    this.clock.start()

    this.curTest = this.testMap.gloomShader
    this.curTest.init()

    threeEntry.renderCb.push(this.update)
  }

  update = () => {
    const delta = this.clock.getDelta()
    if (this.curTest) {
      this.curTest.update?.(delta)
    }
  }

  clear() {
    if (this.curTest && this.curTest.clear) {
      this.curTest.clear()
    } else {
      threeEntry.cleanTestRoot()
    }
    this.curTest = null

    for (let i = threeEntry.renderCb.length - 1; i >= 0; i--) {
      const cb = threeEntry.renderCb[i]
      if (cb === this.update) {
        threeEntry.renderCb.splice(i, 1)
        break
      }
    }
  }
}

export const threeTest = new ThreeTest()

if (import.meta.hot) {
  import.meta.hot.accept((mod) => {
    threeTest.clear()
    mod.threeTest.init()
  })
}
