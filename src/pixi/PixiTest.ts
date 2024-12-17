import { animationSpriteDemo } from './demo/AnimationSpriteDemo'
import { batchTest } from './demo/BatchTest'
import { cacheTest } from './demo/CacheTest'
import { goHit } from './demo/GOHit'
import { graphicsCacheTest } from './demo/GraphicsCacheTest'
import { hiddenRender } from './demo/HiddenRender'
import { pixiLottie } from './demo/lottie/PixiLottie'
import { maskPerfTest } from './demo/MaskPerfTest'
import { maskTest } from './demo/MaskTest'
import { memTest } from './demo/MemTest'
import { pixelChecker } from './demo/PixelChecker'
import { rectTest } from './demo/RectTest'
import { textureTest } from './demo/TextureTest'
import { timeShaderTest } from './demo/TimeShaderTest'
import { scrollNum } from './demo/ScrollNum'
import { scrollNumTexture } from './demo/ScrollNumTexture'
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
    maskPerfTest,
    maskTest,
    cacheTest,
    animationSpriteDemo,
    textureTest,
    pixiLottie,
    pixelChecker,
    graphicsCacheTest,
    hiddenRender,
    batchTest,
    scrollNum,
    scrollNumTexture,
  } satisfies Record<string, ITest>

  init() {
    this.curTest = this.testMap.scrollNumTexture

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
    if (this.curTest && this.curTest.clear) {
      this.curTest.clear()
    }
    this.curTest = null
    pixiEntry.cleanRoot()
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
