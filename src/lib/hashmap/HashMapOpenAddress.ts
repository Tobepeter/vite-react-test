export class HashMapOpenAddress<T = any> {
  private table: Array<{ key: string; value: T } | null>
  private size: number
  private capacity: number
  private loadFactorThreshold: number

  constructor(initialCap: number = 16) {
    this.capacity = initialCap
    this.size = 0
    this.loadFactorThreshold = 0.75
    this.table = new Array(this.capacity).fill(null)
  }

  private hash(key: string): number {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i)
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash) % this.capacity
  }

  private findSlot(key: string): number {
    let index = this.hash(key)
    let i = 0

    // 线性探测
    while (this.table[index] !== null) {
      if (this.table[index]!.key === key) {
        return index
      }
      i++
      index = (this.hash(key) + i) % this.capacity

      // 如果已经探测了整个表，说明表已满
      if (i >= this.capacity) {
        return -1
      }
    }
    return index
  }

  private resize(): void {
    const oldTable = this.table
    this.capacity *= 2
    this.table = new Array(this.capacity).fill(null)
    this.size = 0

    for (const item of oldTable) {
      if (item !== null) {
        this.put(item.key, item.value)
      }
    }
  }

  put(key: string, value: T): void {
    if (this.size >= this.capacity * this.loadFactorThreshold) {
      this.resize()
    }

    const index = this.findSlot(key)
    if (index === -1) {
      throw new Error('哈希表已满')
    }

    if (this.table[index] === null) {
      this.size++
    }
    this.table[index] = { key, value }
  }

  get(key: string): T | undefined {
    const index = this.findSlot(key)
    if (index === -1 || this.table[index] === null) {
      return undefined
    }
    return this.table[index]!.value
  }

  remove(key: string): boolean {
    const index = this.findSlot(key)
    if (index === -1 || this.table[index] === null) {
      return false
    }

    this.table[index] = null
    this.size--
    return true
  }

  contains(key: string): boolean {
    const index = this.findSlot(key)
    return index !== -1 && this.table[index] !== null
  }

  getSize(): number {
    return this.size
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  clear(): void {
    this.table = new Array(this.capacity).fill(null)
    this.size = 0
  }
}
