/**
 * 数据存储
 *
 * features
 * - 支持scope范围读取
 * - 支持throttle保存
 * - 自动删除陈旧的数据
 */
export class Storage<T extends object = any> {
  static readonly key = 'vite-app'
  static readonly preservedScope = '$scopes'
  static readonly defaultScope = 'default'

  static defaultConfig: StorageConfig = {
    canThrottle: true,
    saveThrottle: 1000,
    maxSaveTime: 1 * 3600 * 1000, // 1 hour
    scope: Storage.defaultScope,
  }

  scope: string
  isThrottle: boolean
  saveThrottle: number
  maxSaveTime: number

  data: T | null = null

  private lastSaveTime = 0
  private saveDataTimer = -1

  constructor(config?: StorageConfig) {
    config = { ...Storage.defaultConfig, ...config }

    this.scope = config.scope

    if (this.scope === Storage.preservedScope) {
      console.warn('scope is reserved, please use other scope')
      this.scope = Storage.defaultScope
    }

    this.isThrottle = config.canThrottle
    this.saveThrottle = config.saveThrottle
    this.maxSaveTime = config.maxSaveTime

    this.restoreData()
  }

  getStorageKey() {
    return `${Storage.key}-${this.scope}`
  }

  getByKey<K extends keyof T>(key: K): T[K] {
    if (!this.data) {
      this.restoreData()
    }
    return this.data ? this.data[key] : null
  }

  restoreData() {
    const key = this.getStorageKey()
    const data = localStorage.getItem(key)
    if (data) {
      let isValid = true
      try {
        const saveData: StorageData<T> = JSON.parse(data)

        // 每次使用使用，看看数据是不是特别陈旧了，如果特别陈旧了，删掉，节约使用
        if (saveData.meta.lastSaveTime + this.maxSaveTime < Date.now()) {
          isValid = false
        } else {
          this.data = saveData.data
        }
      } catch (e) {
        isValid = false
      }
      if (!isValid) {
        this.clear()
      }
    } else {
      this.reset()
    }
  }

  reset() {
    this.data = {} as T
    this.saveData()
  }

  clear() {
    const key = this.getStorageKey()
    localStorage.removeItem(key)
    this.data = null
  }

  saveData() {
    if (!this.data) return
    const key = this.getStorageKey()
    const saveData: StorageData<T> = {
      data: this.data,
      meta: {
        lastSaveTime: Date.now(),
      },
    }
    localStorage.setItem(key, JSON.stringify(saveData))
  }

  save() {
    if (this.isThrottle) {
      this.throttleSaveData()
    } else {
      this.saveData()
    }
  }

  throttleSaveData() {
    if (this.saveDataTimer) return

    const now = Date.now()
    const timeSinceLastSave = now - this.lastSaveTime

    if (timeSinceLastSave >= this.saveThrottle) {
      this.saveData()
      this.lastSaveTime = now
      return
    }

    this.saveDataTimer = setTimeout(() => {
      this.saveData()
      this.lastSaveTime = Date.now()
      this.saveDataTimer = null
    }, this.saveThrottle) as unknown as number
  }
}

export interface StorageData<T> {
  data: T
  meta: {
    lastSaveTime: number
  }
}

export interface StorageConfig {
  canThrottle?: boolean
  saveThrottle?: number
  maxSaveTime?: number
  scope?: string
  key?: string
}
