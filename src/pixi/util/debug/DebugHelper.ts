import { DisplayObject } from 'pixi.js'

class DebugHelper {
  /** 依次执行数组项目 */
  loopItem<T>(fn: (item: T) => any, arr: T[], delay = 1000) {
    let idx = 0
    const func = () => {
      fn(arr[idx])
      idx++
      if (idx >= arr.length) {
        idx = 0
      }
      setTimeout(func, delay)
    }
    func()
  }

  /** 依次执行 */
  loopFn(fnArr: Array<any>, caller = null, delay = 1000) {
    let idx = 0
    const func = () => {
      fnArr[idx].call(caller)
      idx++
      if (idx >= fnArr.length) {
        idx = 0
      }
      setTimeout(func, delay)
    }
    func()
  }

  loopTest(fn: () => void, delay = 500) {
    setInterval(fn, delay)
  }

  delayTest(fn: () => void, delay = 500) {
    setTimeout(fn, delay)
  }

  delayPromise(delay = 500) {
    return new Promise(resolve => {
      setTimeout(resolve, delay)
    })
  }

  keyTest(fn: () => void) {
    const key = 't'
    window.addEventListener('keydown', e => {
      if (e.key === key) {
        fn()
      }
    })
  }

  waitUntil(fn: () => boolean, dur = 100, timeout = 5000) {
    const startTime = Date.now()
    return new Promise(resolve => {
      const func = () => {
        if (fn()) {
          resolve(true)
          return
        }
        if (Date.now() - startTime > timeout) {
          resolve(false)
          return
        }
        setTimeout(func, dur)
      }
      func()
    })
  }

  getEnumKey(enumObj: object, value: string | number) {
    // 枚举作为key时候经常会转换为string， 对比转换为number
    value = +value
    return Object.keys(enumObj).find(key => enumObj[key] === value) || ''
  }

  getTreeStr(obj: DisplayObject) {
    const indent = 2
    let str = ''
    const processObj = (obj: DisplayObject, curIndent: number) => {
      str += ' '.repeat(curIndent) + obj.name + '\n'
      obj.children.forEach(child => processObj(child as any, curIndent + indent))
    }
    processObj(obj, 0)
    return str
  }
}

export const debugHelper = new DebugHelper()
