export interface EnhancedPromiseFunc {
  <T>(promise: Promise<T>, opt?: EnhancedPromiseOpt<T>): EnhancedPromise<T>
  defaultTimeout: number
}

export interface EnhancedPromiseOpt<T> {
  timeout?: number
  onEvent?: (e: EnhancedPromiseEvent) => void
  /**
   * 创建回调
   *
   * 其实和返回值是一样的，只是很多时候我们使用async + await，跳过了拿到promise本体
   * 增加一个函数可以方便我们使用cancel之类的方法
   */
  onCreate?: (pms: EnhancedPromise<T>) => void
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TimeoutError'
  }
}

export type EnhancedPromiseEvent = 'resolve' | 'reject' | 'timeout' | 'cancel'

export interface EnhancedPromise<T = any> extends Promise<T> {
  cancel: () => void
  onEventList: ((e: EnhancedPromiseEvent) => void)[]
  readonly isTimeout: boolean
  readonly isCancel: boolean
}
