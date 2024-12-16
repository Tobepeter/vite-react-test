import { Clock } from 'three'
import { cubeTest } from './demo/CubeTest'
import { IThreeTest } from './util/IThreeTest'
import { brightnessShader } from './demo/BrightnessShader'
import { bloomShader } from './demo/BloomShader'
import { normalFadeShader } from './demo/NormalFadeShader'
import { tonemapShader } from './demo/TonemapShader'
import { hslTest } from './demo/HSLTest'
import { hsl2rgb } from './demo/HSL2RGB'
import { hsl2rgbSingleParam } from './demo/HSL2RGBSingleParam'
import { lightBulb } from './demo/LightBulb'

class ThreeTest {
  curTest: IThreeTest = null
  testMap = {
    cubeTest,
    brightnessShader,
    bloomShader,
    normalFadeShader,
    tonemapShader,
    hslTest,
    hsl2rgb,
    hsl2rgbSingleParam,
    lightBulb,
  } satisfies Record<string, IThreeTest>

  clock = new Clock()

  init() {
    this.clock.start()

    // -- change test here --
    this.curTest = this.testMap.bloomShader
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
