class ConsoleCount {
  init() {
    this.test_count_reset()
  }

  test_count_reset() {
    console.count('test')
    console.count('test')
    console.countReset('test')
    console.count('test')
  }
}

export const consoleCount = new ConsoleCount()
