class ConsoleStyle {
  init() {
    // this.test_color()
    // this.test_bgColor()
    // this.test_fontSize()
    // this.test_textDecoration()
    // this.test_border()
    // this.test_padding()
    // this.test_partial()
    this.test_partial_replacer()
  }

  test_color() {
    console.log('%cHello, world!', 'color: red; font-weight: bold;')
  }

  test_bgColor() {
    console.log('%cHello, world!', 'background-color: red; color: white;')
  }

  test_fontSize() {
    console.log('%cHello, world!', 'font-size: 24px;')
  }

  test_textDecoration() {
    console.log('%cHello, world!', 'text-decoration: underline;')
  }

  test_border() {
    console.log('%cHello, world!', 'border: 1px solid blue; padding: 5px;')
  }

  test_padding() {
    console.log('%cHello, world!', 'padding: 10px; background: yellow;')
  }

  test_partial() {
    console.log('%cHello%c, world!', 'color: yellow;', 'color: unset;')
  }

  test_partial_replacer() {
    const replacer = 'hello'
    const bgColor = 'yellow'
    const str = 'hello world, hello hellohello!!'
    const format = []
    const regex = new RegExp(replacer, 'g')
    let result = str.replace(regex, match => {
      format.push(`background-color: ${bgColor};`, '') // 结尾的空是清除样式用的
      return `%c${match}%c`
    })
    console.log(result, ...format)
  }
}

export const consoleStyle = new ConsoleStyle()
