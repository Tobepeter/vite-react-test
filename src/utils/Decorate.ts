class Decorate {
  readonly initMethodName = '_deco_init'
  readonly nameKey = '_deco_name'
  readonly intListKey = '_deco_intList'
  readonly modifyPropsKey = '_deco_modifyProps' // 注入的需要修改的属性list
  readonly modifyPropPrefix = '_deco_modifyProp' // 注入的属性前缀

  injectClass(cls: any) {
    // 如果已经注入了初始方法，则不重复注入
    if (cls.prototype[this.initMethodName]) {
      if (!cls.prototype.hasOwnProperty(this.initMethodName)) {
        console.warn('[Decorate] inject class not support inherit')
      }
      return cls
    }

    const name = cls.name
    const initMethod = this.initMethodName
    const intCbListKey = this.intListKey
    const modifyPropsKey = this.modifyPropsKey

    const hackTarget = class DecorateClass extends cls {
      constructor(...args: any[]) {
        super(...args)
        this[initMethod]()
      }

      [initMethod]() {
        console.log('init')

        const ins = this
        const modifyProps = ins.constructor.prototype[modifyPropsKey] as string[]
        debugger

        // 替换属性，保证使用原型上的get set
        for (const prop of modifyProps) {
          const val = ins[prop]
          const propKey = this.getPropKey(prop)
          ins[propKey] = val
          delete ins[prop] // 删除原始的属性，保证使用原型上的get set
        }

        // 构造钩子回调
        const intCbList = ins[intCbListKey] as InitCb[]
        intCbList.forEach(cb => cb.call(null, { ins, name }))
      }
    }
    hackTarget[this.nameKey] = name // 保留原始的类名信息
    hackTarget.prototype[intCbListKey] = [] // 注意是放到prototype上的，这样信息提前注入

    return hackTarget
  }

  /** 替换的新的属性名 */
  private getPropKey(prop: string) {
    return this.modifyPropPrefix + '_' + prop
  }

  /** set回调key */
  private getOnSetCbListKey(prop: string) {
    return this.getPropKey(prop) + '_' + 'onSetList'
  }

  /** get回调key */
  private getOnGetCbListKey(prop: string) {
    return this.getPropKey(prop) + '_' + 'onGetList'
  }

  checkValidClass(cls: any) {
    const valid = !!cls.prototype[this.initMethodName]
    return valid
  }

  /**
   * 替换装饰类自己的构造器
   * @param cls 需要替换的构造器，如果已经替换了，直接返回
   * @returns 返回符合装饰器类的构造器
   */
  autoInject(cls: any) {
    if (!this.checkValidClass(cls)) {
      return this.injectClass(cls)
    }
    return cls
  }

  registerInit(cls: any, cb: InitCb) {
    cls = this.autoInject(cls)
    const intCbList = cls.prototype[this.intListKey] as InitCb[]
    intCbList.push(cb)
  }

  injectProp(proto: any, prop: string | symbol) {
    const isSymbol = typeof prop === 'symbol'
    if (isSymbol) {
      console.warn('[Decorate] symbol not support')
      return null
    }

    const cls = this.autoInject(proto.constructor)
    proto = cls.prototype

    // 注入的属性list
    if (!proto[this.modifyPropsKey]) {
      proto[this.modifyPropsKey] = []
    }
    proto[this.modifyPropsKey].push(prop)

    // 注入getset
    const propKey = this.getPropKey(prop)
    const onSetKey = this.getOnSetCbListKey(prop)
    const onGetKey = this.getOnGetCbListKey(prop)

    if (!proto[prop]) {
      proto[onGetKey] = []
      proto[onSetKey] = []

      Object.defineProperty(proto, prop, {
        get: function () {
          if (proto[onGetKey]) {
            const cbList = proto[onGetKey] as (() => any)[]
            cbList.forEach(cb => cb())
          }
          return this[propKey]
        },
        set: function (val: any) {
          this[propKey] = val

          if (proto[onSetKey]) {
            const cbList = proto[onSetKey] as ((val: any) => void)[]
            cbList.forEach(cb => cb(val))
          }
        },
      })
    }

    // 不修改原始的装饰器
    return null
  }

  watchProp(proto: any, prop: string | symbol, onSet?: (val: any) => void, onGet?: () => any) {
    if (typeof prop === 'symbol') {
      console.warn('[Decorate] symbol not support')
      return null
    }

    // TODO: 有很多注入问题需要考虑，最好保证注入到新的构造器上
    this.injectProp(proto, prop)

    const onSetKey = this.getOnSetCbListKey(prop)
    const onGetKey = this.getOnGetCbListKey(prop)

    if (onSet) {
      proto[onSetKey].push(onSet)
    }
    if (onGet) {
      proto[onGetKey].push(onGet)
    }
  }
}

export const decorate = new Decorate()

export const inject: ClassDecorator = (target: any) => {
  return decorate.injectClass(target)
}

export const injectProp: PropertyDecorator = (proto: any, prop: string | symbol) => {
  return decorate.injectProp(proto, prop)
}

export const watchProp: PropertyDecorator = (proto: any, prop: string | symbol, onSet?: (val: any) => void, onGet?: () => any) => {
  return decorate.watchProp(proto, prop, onSet, onGet)
}

export const watchLog: PropertyDecorator = (proto: any, prop: string | symbol) => {
  return decorate.watchProp(
    proto,
    prop,
    val => {
      console.log('set', prop, val)
    },
    () => {
      console.log('get', prop)
    }
  )
}

export type InitCb = (info: { ins: InstanceType<any>; name: string }) => void

// TEST
class TESTClass {
  @watchLog
  name: string = 'test'
  name2: string = 'test2'

  constructor() {
    setTimeout(() => {
      this.name = 'test3'
    }, 1000)
  }
}
new TESTClass()
