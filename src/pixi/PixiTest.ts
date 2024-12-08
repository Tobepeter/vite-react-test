import { animationSpriteDemo } from './demo/AnimationSpriteDemo'
import { cacheTest } from './demo/CacheTest'
import { goHit } from './demo/GOHit'
import { pixiLottie } from './demo/lottie/PixiLottie'
import { maskTest } from './demo/MaskTest'
import { memTest } from './demo/MemTest'
import { pixelChecker } from './demo/PixelChecker'
import { rectTest } from './demo/RectTest'
import { textureTest } from './demo/TextureTest'
import { timeShaderTest } from './demo/TimeShaderTest'
import { debugQueryRunner } from './util/debug/DebugQueryRunner'
import type { ITest } from './util/ITest'
import { pixiInput } from './util/PixiInput'

class PixiTest {
  curTest: ITest = null
  testMap = {
    rectTest,
    timeShaderTest,
    goHit,
    memTest,
    maskTest,
    cacheTest,
    animationSpriteDemo,
    textureTest,
    pixiLottie,
    pixelChecker,
  } satisfies Record<string, ITest>

  init() {
    this.curTest = this.testMap.pixelChecker

    if (this.curTest.config) {
      const { dom, input } = this.curTest.config
      pixiEntry.domHandle.setConfig(dom)
      pixiInput.setConfig(input)
    }

    this.curTest.init()

    // NOTE: 使用query来进行切换
    // debugQueryRunner.run(this.testMap);
  }

  update = (delta: number) => {
    if (this.curTest && this.curTest.update) {
      this.curTest.update(delta)
    }
  }

  clear() {
    // NOTE: 如果指定了clear方法，让测试类自己清理
    if (this.curTest && this.curTest.clear) {
      this.curTest.clear()
    } else {
      pixiEntry.cleanRoot()
    }
    this.curTest = null
  }
}

export const pixiTest = new PixiTest()

if (import.meta.hot) {
  import.meta.hot.accept(mod => {
    // callback引用需要替换
    pixiTest.update = mod.update

    pixiTest.clear()
    mod.pixiTest.init()
  })
}
