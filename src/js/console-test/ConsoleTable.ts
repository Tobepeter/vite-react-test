class ConsoleTable {
  init() {
    this.test_arr()
    this.test_arr_not_common_key()
    this.test_obj()
  }

  test_arr() {
    console.log('test_arr')
    console.table([
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ])
  }

  /**
   * 测试数组中对象的key不一致的情况
   * @desc 没有的key会使用空
   */
  test_arr_not_common_key() {
    console.log('test_arr_not_common_key')
    console.table([
      { a: 1, b: 2 },
      { a: 3, c: 4 },
    ])
  }

  test_obj() {
    console.log('test_obj')
    console.table({ a: 1, b: 2 })
  }
}

export const consoleTable = new ConsoleTable()
