/**
 * 测试在chrome source面板直接修改
 *
 * 在sourcemap下直接修改ts是不能生效的
 * 只有关闭了sourcemap，直接修改js文件才能生效
 */
class ChromeMod {
  init() {
    window.addEventListener('keydown', e => {
      if (e.key === 't') {
        this.print()
      }
    })
  }

  print() {
    console.log('hello world')
  }
}

export const chromeMod = new ChromeMod()
