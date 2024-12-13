/**
 * 装饰器执行顺序
 *
 * [不同类型] 是先执行类里面的装饰器，最后替换的
 * [多个] 如果有多个装饰器，装饰器是顺序从下往上
 */
export function TSDecoOrderTest() {
  const clsDeco: ClassDecorator = (target: any) => {
    console.log('clsDeco run')
    class MyDecoClass extends target {}
    return MyDecoClass as any
  }

  const clsDeco2: ClassDecorator = (target: any) => {
    console.log('clsDeco2 run')
    return target
  }

  const methodDeco: MethodDecorator = (proto: any, propertyKey, descriptor) => {
    console.log('methodDeco run', proto.constructor.name)
    console.log('target is TSDecoOrder: ', proto.constructor === TSDecoOrder)
  }

  // 这里的装饰器是自动运行的，执行函数即可
  @clsDeco
  @clsDeco2
  class TSDecoOrder {
    @methodDeco
    myMethod() {}
  }
}
