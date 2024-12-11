import { webGLTriangle } from './demo/WebGLTriangle'
import { IWebGLTest } from './utils/IWebGLTest'

class WebGLTest {
  currTest: IWebGLTest

  init() {
    this.currTest = webGLTriangle
    this.currTest.init()
  }

  render() {
    this.currTest.render()
  }
}

export const webGLTest = new WebGLTest()
