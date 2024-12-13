import { monitorLog } from '../deco/Decorate'

class DecorateTest {
  init() {
    this.test_onInit()
  }

  test_onInit() {
    @decorate.onInit()
    @inject
    class DecorateTest_Cls {
      @monitorLog
      name: string = 'test'
      name2: string = 'test2'
      constructor() {
        setTimeout(() => {
          this.name = 'test3'
        }, 1000)
      }
    }

    new DecorateTest_Cls()
  }
}

export const decorateTest = new DecorateTest()
