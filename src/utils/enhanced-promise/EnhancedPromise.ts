import type { Writable } from '../ts-type'
import { EnhancedPromiseFunc, EnhancedPromise, TimeoutError, EnhancedPromiseEvent } from './EnhancedPromiseType'

/**
 * 增强Promise，增加取消和超时功能
 * @param promise 原始Promise(如果有多个外部可以自行all聚合)
 * @param timeout 超时时间，如果是0，则不超时
 *
 * cancel 提供取消能力，比如一些销毁的对象，不成功，也不拒绝，等待默认gc即可
 */
export const enhancedPromise: EnhancedPromiseFunc = (promise, opt?) => {
  let timeOutId = -1

  const timeout = opt?.timeout ?? enhancedPromise.defaultTimeout
  const onEvent = opt?.onEvent
  const onCreate = opt?.onCreate

  let triggerEvent: (e: EnhancedPromiseEvent) => void

  const pms = new Promise((resolve, reject) => {
    promise
      .then(res => {
        if (pms_w.isCancel || pms_w.isTimeout) return
        clearTimeout(timeOutId)
        triggerEvent('resolve')
        resolve(res)
      })
      .catch(err => {
        if (pms_w.isCancel || pms_w.isTimeout) return
        clearTimeout(timeOutId)
        triggerEvent('reject')
        reject(err)
      })

    if (timeout > 0) {
      timeOutId = setTimeout(() => {
        if (pms_w.isCancel || pms_w.isTimeout) return
        pms_w.isTimeout = true
        triggerEvent('timeout')
        reject(new TimeoutError('Promise timeout'))
      }, timeout) as unknown as number
    }
  }) as EnhancedPromise

  const pms_w = pms as Writable<EnhancedPromise>
  pms_w.isCancel = false
  pms_w.isTimeout = false
  pms_w.onEventList = []
  pms.cancel = () => {
    if (pms_w.isCancel) return
    pms_w.isCancel = true
    clearTimeout(timeOutId)
    triggerEvent('cancel')
  }

  if (onEvent) {
    pms_w.onEventList.push(onEvent)
  }
  if (onCreate) {
    onCreate(pms)
  }

  triggerEvent = (e: EnhancedPromiseEvent) => {
    pms_w.onEventList.forEach(fn => fn(e))
  }

  return pms
}

enhancedPromise.defaultTimeout = 3000
