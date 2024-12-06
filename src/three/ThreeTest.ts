import { Clock } from 'three'
import { cubeTest } from './demo/CubeTest'
import { IThreeTest } from './util/IThreeTest'

class ThreeTest {
  curTest: IThreeTest = null
  testMap = {
    cubeTest,
  } satisfies Record<string, IThreeTest>

  clock = new Clock()

  init() {
    this.clock.start()

    this.curTest = this.testMap.cubeTest
    this.curTest.init()
  }

  update() {
    const delta = this.clock.getDelta()
    this.curTest.update?.(delta)
  }

  clear() {
    if (this.curTest && this.curTest.clear) {
      this.curTest.clear()
    } else {
      threeEntry.cleanTestRoot()
    }
    this.curTest = null
  }
}

export const threeTest = new ThreeTest()

if (import.meta.hot) {
  import.meta.hot.accept((mod) => {
    threeTest.clear()
    mod.threeTest.init()
  })
}
