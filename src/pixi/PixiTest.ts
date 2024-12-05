import { animationSpriteDemo } from './demo/AnimationSpriteDemo'
import { cacheTest } from './demo/CacheTest'
import { goHit } from './demo/GOHit'
import { pixiLottie } from './demo/lottie/PixiLottie'
import { maskTest } from './demo/MaskTest'
import { memTest } from './demo/MemTest'
import { rectTest } from './demo/RectTest'
import { textureTest } from './demo/TextureTest'
import { timeShaderTest } from './demo/TimeShaderTest'
import { debugQueryRunner } from './util/debug/DebugQueryRunner'
import type { ITest } from './util/ITest'

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
  } satisfies Record<string, ITest>

  init() {
    this.curTest = this.testMap.pixiLottie
    this.curTest.init()

    // NOTE: 使用query来进行切换
    // debugQueryRunner.run(this.testMap);
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
  import.meta.hot.accept((mod) => {
    pixiTest.clear()
    mod.pixiTest.init()
  })
}
