import { enhancedPromise } from './EnhancedPromise'
import { EnhancedPromise, EnhancedPromiseOpt } from './EnhancedPromiseType'

/**
 * 管理多个增强Promise
 * 通常用于一键销毁
 */
export class EnhancedPromiseScope {
  private promiseList: EnhancedPromise<any>[] = []
  private isCanceling = false

  create<T>(promise: Promise<T>, opt?: EnhancedPromiseOpt<T>): EnhancedPromise<T> {
    const pms = enhancedPromise(promise, opt)
    this.promiseList.push(pms)

    // 只要是promise失效，就从列表中移除
    pms.onEventList.push(e => {
      // 如果整个scope取消，后续直接批量移除
      if (this.isCanceling) return
      this.promiseList.splice(this.promiseList.indexOf(pms), 1)
    })

    return pms
  }

  cancel() {
    this.isCanceling = true
    this.promiseList.forEach(pms => {
      pms.cancel()
    })
    this.promiseList = []
    this.isCanceling = false
  }
}
