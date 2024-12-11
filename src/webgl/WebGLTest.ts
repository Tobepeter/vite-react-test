import { webGLRTDefault } from './demo/WebGLRTDefault'
import { webGLTriangle } from './demo/WebGLTriangle'
import { IWebGLTest } from './utils/IWebGLTest'

class WebGLTest {
  currTest: IWebGLTest

  testMap = {
    webGLTriangle,
    webGLRTDefault,
  } satisfies Record<string, IWebGLTest>

  init() {
    this.currTest = this.testMap.webGLRTDefault
    this.currTest.init()
  }

  render() {
    this.currTest.render()
  }
}

export const webGLTest = new WebGLTest()
