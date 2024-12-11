import { Clock } from 'three'
import { cubeTest } from './demo/CubeTest'
import { IThreeTest } from './util/IThreeTest'
import { brightnessShader } from './demo/BrightnessShader'
import { bloomShader } from './demo/BloomShader'
import { normalFadeShader } from './demo/NormalFadeShader'
import { tonemapShader } from './demo/TonemapShader'

class ThreeTest {
  curTest: IThreeTest = null
  testMap = {
    cubeTest,
    brightnessShader,
    bloomShader,
    normalFadeShader,
    tonemapShader,
  } satisfies Record<string, IThreeTest>

  clock = new Clock()

  init() {
    this.clock.start()

    this.curTest = this.testMap.tonemapShader
    this.curTest.init()
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
    }
    threeEntry.cleanTest()
    this.curTest = null
  }
}

export const threeTest = new ThreeTest()

if (import.meta.hot) {
  import.meta.hot.accept(mod => {
    threeTest.clear()
    mod.threeTest.init()

    // 替换callback引用
    threeTest.update = mod.upda
  })
}
