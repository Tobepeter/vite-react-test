/**
 * getset测谁
 *
 * 经过测试，this.name=xxx 属性不一定是添加到自身的，还会经历原型查找
 * 通过 Object.defineProperty 设置的属性，可以阻止继续访问原型上的
 */
export function TSGetSet() {
  class Person {
    _name = 'aaa'

    get name() {
      return this._name
    }

    set name(value: string) {
      this._name = value
    }
  }

  const person = new Person()
  console.log(person.name)
  person.name = 'bbb'
  console.log(person.name)

  console.log('person.hasOwnProperty(name)', person.hasOwnProperty('name'))
  console.log('person.hasOwnProperty(_name)', person.hasOwnProperty('_name'))

  Object.defineProperty(person, 'name', {
    value: 'ccc',
    configurable: true,
    writable: true,
  })

  console.log('person.name', person.name)
  person.name = 'ddd'
  console.log('person.name', person.name)
  console.log('person._name', person._name)
}
