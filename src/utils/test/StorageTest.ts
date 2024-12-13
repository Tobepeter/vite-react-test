class StorageTest {
  init() {
    this.test_persist()
  }

  test_persist() {
    @inject
    class Test {
      @storage.persist
      count = 1
    }

    const test = new Test()
    // NOTE: modify in console
    win.test = test
    console.log('test', test)
    console.log('test.count', test.count)
    console.log('test.cls', test.constructor)
    console.log('test.cls.prototype.__proto__', test.constructor.prototype.__proto__)
  }
}

export const storageTest = new StorageTest()
