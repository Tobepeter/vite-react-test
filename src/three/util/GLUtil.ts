import { debug } from 'console'

class GLUtil {
  private isMapInit = false
  // NOTE: 可能存在多个key映射到同一个值，所以使用数组
  enumMap: Record<GLenum, string | string[]> = {}

  monitorFunc: string[] = []

  bypassKeys: string[] = [
    // 不能访问它，会出现
    // TypeError: Illegal invocation
    'canvas',
    'drawingBufferWidth',
    'drawingBufferHeight',
    'drawingBufferColorSpace',
    'unpackColorSpace',
    'drawingBufferFormat',
  ]

  commonMonitorKeys: string[] = [
    // prettier-ignore
    'clear',
    'drawArrays',
    'drawElements',
    'clearColor',
    'clearDepth',
    'clearStencil',

    'drawArrays',
    'drawElements',
    'drawArraysInstanced',
    'drawElementsInstanced',

    'colorMask',
    'depthMask',
    'stencilMask',
    'enable',
    'disable',
    'blendFunc',
    'blendEquation',
    'blendFuncSeparate',
    'blendEquationSeparate',
    'blendColor',
    'blend',
    'blendEquation',
    'blendEquationSeparate',
    'blendFuncSeparate',
  ]

  initEnumMap() {
    if (this.isMapInit) return
    this.isMapInit = true

    const gl = threeEntry.renderer.getContext()
    const glProto = Object.getPrototypeOf(gl)
    const keys = Object.keys(glProto)
    for (const key of keys) {
      if (this.bypassKeys.includes(key)) continue
      // 跳过非大写字母开头的key
      if (key[0] !== key[0].toUpperCase()) continue

      const val = glProto[key]
      const isInt = !isNaN(parseInt(val))
      if (isInt) {
        if (this.enumMap[val] == undefined) {
          this.enumMap[val] = key
        } else {
          const isArray = Array.isArray(this.enumMap[val])
          if (!isArray) {
            this.enumMap[val] = [this.enumMap[val] as string]
          }
          ;(this.enumMap[val] as string[]).push(key)
        }
      }
    }
  }

  getEnumName(e: GLenum) {
    this.initEnumMap()
    return this.enumMap[e]
  }

  /**
   * 批量获取枚举名
   * @desc 有的gl接口，如 blendFuncSeparate 是批量参数的，提供一个批量接口方便使用
   */
  getEnumNameArr(arr: GLenum[]) {
    return arr.map(e => this.getEnumName(e))
  }

  initMonitorFunc() {
    if (this.monitorFunc.length > 0) return
    const gl = threeEntry.renderer.getContext()
    const glProto = Object.getPrototypeOf(gl)
    const keys = Object.keys(glProto)

    for (const key of keys) {
      // 跳过非小写字母开头的key
      if (key[0] !== key[0].toLowerCase()) continue
      if (this.bypassKeys.includes(key)) continue

      const isFunc = typeof glProto[key] === 'function'
      if (!isFunc) continue
      this.monitorFunc.push(key)
    }
  }

  monitor(includeKeys?: string[]) {
    this.initMonitorFunc()

    const gl = threeEntry.renderer.getContext()
    const glProto = Object.getPrototypeOf(gl)

    // TODO: 断点到这里会crash掉，为什么？

    for (const func of this.monitorFunc) {
      if (includeKeys && !includeKeys.includes(func)) continue

      gl[func] = function (this: WebGLRenderingContext, ...args: any[]) {
        console.log(`[gl] ${func}, args:`, args)
        return glProto[func].apply(this, args)
      }
    }
  }

  monitorCommon() {
    this.monitor(this.commonMonitorKeys)
  }

  unmonitor() {
    const gl = threeEntry.renderer.getContext()
    const glProto = Object.getPrototypeOf(gl)
    const keys = Object.keys(glProto)
    for (const key of keys) {
      delete gl[key]
    }
  }
}

export const glUtil = new GLUtil()
