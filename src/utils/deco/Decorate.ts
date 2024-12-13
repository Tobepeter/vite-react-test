import { DecorateInitCb, DecorateOnSet, DecorateOnGet, DecorateWatch as DecorateMonitor, DecorateOnInit, DecorateInitInfo } from './DecorateType'

/**
 * 装饰器工具类
 *
 * Q：成员装饰是否要自动装饰类？
 * 一开始我想着属性装饰自动装饰类，减少代码
 * 但是发现写起来很麻烦， 适配代码很多
 * 而且其实mobx observer，cocos 的 ccclass 都是需要手动声明的
 * 成员不应该太大的副作用
 *
 * 装饰顺序
 * 目前类装饰其实是最后执行的
 * 属性装饰其实都是装饰信息都在旧的构造器的原型上的
 */
class Decorate {
  readonly initMethodName = '_deco_init'
  readonly origNameKey = '_deco_origName'
  readonly origClsKey = '_deco_origCls'
  readonly intListKey = '_deco_intList'
  readonly modifyPropsKey = '_deco_modifyProps' // 注入的需要修改的属性list
  readonly modifyPropPrefix = '_deco_modifyProp' // 注入的属性前缀

  /**
   * 注入初始化方法
   * @desc 方便其他成员装饰能够在构造时候获取到实例
   */
  inject: ClassDecorator = (cls: any) => {
    // 如果已经注入了初始方法，则不重复注入
    if (this.isInject(cls)) {
      console.warn('[Decorate] inject class not support inherit')
      return cls
    }

    const name = cls.name
    const initMethodName = this.initMethodName

    const initMethod = (ins: Object) => {
      const modifyProps = cls.prototype[this.modifyPropsKey] as string[]

      // 替换属性，保证使用原型上的get set
      for (const prop of modifyProps) {
        // TODO: 暂时没兼容本身是 get set 的属性
        const desc = Object.getOwnPropertyDescriptor(ins, prop)
        if (desc?.get || desc?.set) {
          console.warn(`[Decorate] prop ${prop} is get set`)
          continue
        }

        const val = ins[prop]
        const propKey = this.getPropKey(prop)
        ins[propKey] = val
        delete ins[prop] // 删除原始的属性，保证使用原型上的get set
      }

      // 构造钩子回调
      const intCbList = ins[this.intListKey] as DecorateInitCb[]
      if (intCbList) {
        intCbList.forEach(cb => cb.call(null, { ins, name, cls: ins.constructor }))
      }
    }

    const hackTarget = class DecorateClass extends cls {
      constructor(...args: any[]) {
        super(...args)
        this[initMethodName]()
      }

      [initMethodName]() {
        initMethod(this)
      }
    }
    hackTarget[this.origNameKey] = name // 保留原始的类名信息
    hackTarget[this.origClsKey] = cls // 保留原始的类
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

  getOrigCls(cls: any) {
    return cls[this.origClsKey]
  }

  getOrigName(cls: any) {
    return cls[this.origNameKey]
  }

  isInject(cls: any) {
    const valid = !!cls.prototype[this.initMethodName]
    return valid
  }

  /**
   * 注册初始化回调
   */
  registerInit(cls: any, cb: DecorateInitCb) {
    let intCbList = cls.prototype[this.intListKey] as DecorateInitCb[]
    if (!intCbList) {
      intCbList = []
      cls.prototype[this.intListKey] = intCbList
    }
    intCbList.push(cb)
  }

  onInit: DecorateOnInit = cb => {
    if (!cb) {
      cb = (info: DecorateInitInfo) => {
        console.log('onInit', info)
      }
    }
    return (cls: any) => {
      this.registerInit(cls, cb)
      return cls
    }
  }

  /**
   * 注入属性
   *
   * 在构造时候重名属性
   * 在原型上注入属性同名的访问符
   */
  injectProp: PropertyDecorator = (proto, prop) => {
    const isSymbol = typeof prop === 'symbol'
    if (isSymbol) {
      console.warn('[Decorate] symbol not support')
      return null
    }

    if (!proto[this.modifyPropsKey]) {
      proto[this.modifyPropsKey] = []
    } else {
      if (this.isInjectProp(proto, prop)) {
        console.warn(`[Decorate] prop ${prop} already exist`)
        return null
      }
    }

    // 注入的属性list
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
        // TODO: 定义可见性和可配置
      })
    } else {
      console.warn(`[Decorate] try inject prop ${prop} getset but already exist`)
    }

    // 不修改原始的装饰器
    return null
  }

  isInjectProp(proto: any, prop: string | symbol) {
    const arr = proto[this.modifyPropsKey]
    if (!arr) return false
    return arr.includes(prop)
  }

  /**
   * 监听属性
   */
  monitor: DecorateMonitor = (onSet?: any, onGet?: any) => {
    return (proto, prop) => {
      if (typeof prop === 'symbol') {
        console.warn('[Decorate] symbol not support')
        return null
      }

      if (!this.isInjectProp(proto, prop)) {
        this.injectProp(proto, prop)
      }

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

  monitorLog: PropertyDecorator = (proto, prop) => {
    return this.monitor(
      (val: any) => {
        console.log('set', prop, val)
      },
      () => {
        console.log('get', prop)
      }
    )(proto, prop)
  }

  monitorDebug: PropertyDecorator = (proto, prop) => {
    return this.monitor((val: any) => {
      debugger
    }, null)(proto, prop)
  }
}

export const decorate = new Decorate()

export const inject = decorate.inject.bind(decorate)
export const monitor = decorate.monitor.bind(decorate)
export const monitorLog = decorate.monitorLog.bind(decorate)
export const monitorDebug = decorate.monitorDebug.bind(decorate)
