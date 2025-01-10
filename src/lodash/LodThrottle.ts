import { throttle } from 'lodash'
import { Pane } from 'tweakpane'

class LodashThrottle {
  init() {
    this.test_throttle()
  }

  test_throttle() {
    const onClick = () => {
      console.log('click')
    }

    // 进过测试，单位是毫秒
    const delay = 1000

    // 经过测试，第一次会立刻立刻触发，后续点击不会顺延定时器
    const throttleClick = throttle(onClick, delay)

    const pane = new Pane()
    pane
      .addButton({
        title: 'test_throttle',
      })
      .on('click', throttleClick)
  }
}

export const lodashThrottle = new LodashThrottle()
