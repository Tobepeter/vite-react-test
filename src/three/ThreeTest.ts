import { Clock } from 'three'
import { cubeTest } from './demo/CubeTest'
import { IThreeTest } from './util/IThreeTest'
import { brightnessShader } from './demo/BrightnessShader'
import { bloomShader } from './demo/BloomShader'
import { normalFadeShader } from './demo/NormalFadeShader'

class ThreeTest {
  curTest: IThreeTest = null
  testMap = {
    cubeTest,
    brightnessShader,
    bloomShader,
    normalFadeShader,
  } satisfies Record<string, IThreeTest>

  clock = new Clock()

  init() {
    this.clock.start()

    this.curTest = this.testMap.normalFadeShader
    this.curTest.init()

    threeEntry.addUpdateCb(this.update)
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

    threeEntry.removeUpdateCb(this.update)
  }
}

export const threeTest = new ThreeTest()

if (import.meta.hot) {
  import.meta.hot.accept(mod => {
    threeTest.clear()
    mod.threeTest.init()
  })
}
