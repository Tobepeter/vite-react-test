/**
 * 测试在chrome source面板直接修改
 *
 * 在sourcemap下直接修改ts是不能生效的
 * 只有关闭了sourcemap，直接修改js文件才能生效
 */
class ChromeModJS {
  static staticCount = 0
  count = 0

  init() {
    window.addEventListener('keydown', e => {
      if (e.key === 't') {
        // this.test_print()
        // this.testRestartFrame()
        this.test_mode_runtime()
      }
    })
  }

  test_print() {
    console.log('hello world')
  }

  /**
   * 测试重启frame
   *
   * 经过测试，重启frame只有local变量才会重置，全局的变量是不会重置的
   * 其实也合理，比如一些请求，worker，非常多副作用，很难考虑这么全面的
   */
  testRestartFrame() {
    // -- chrome debug here --

    let localCount = 0
    localCount++
    console.log('localCount', localCount)

    ChromeModJS.staticCount++
    console.log('ChromeModJS.staticCount', ChromeModJS.staticCount)

    this.count++
    console.log('this.count', this.count)
  }

  /**
   * 测试mode runtime
   *
   * 需要关闭sourcemap
   * 但是其实vite使用的是esm，是不支持修改的
   *
   * 修改后会有提示
   * LiveEdit failed: The top-level of ES modules can not be edited
   * 应该是esm到处的对象的引用是无法修改的关系
   *
   * @doc https://developer.chrome.com/docs/devtools/javascript/reference?hl=zh-cn#live-edit
   */
  test_mode_runtime() {
    let a = 1
    a = 2
    console.log(a)
  }
}

export const chromeModjs = new ChromeModJS()
