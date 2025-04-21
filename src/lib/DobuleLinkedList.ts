export class DoubleLinkedListNode<T> {
  data: T
  prev: DoubleLinkedListNode<T> | null = null
  next: DoubleLinkedListNode<T> | null = null

  constructor(data: T) {
    this.data = data
  }

  toString(): string {
    return `DoubleLinkedListNode(data: ${this.data})`
  }

  remove(): void {
    if (this.prev) {
      this.prev.next = this.next
    }
    if (this.next) {
      this.next.prev = this.prev
    }
    this.prev = null
    this.next = null
  }

  insertBefore(node: DoubleLinkedListNode<T>): void {
    node.next = this
    node.prev = this.prev
    if (this.prev) {
      this.prev.next = node
    }
    this.prev = node
  }

  insertAfter(node: DoubleLinkedListNode<T>): void {
    node.prev = this
    node.next = this.next
    if (this.next) {
      this.next.prev = node
    }
    this.next = node
  }
}

export class DoubleLinkedList<T> {
  private head: DoubleLinkedListNode<T> | null = null
  private tail: DoubleLinkedListNode<T> | null = null
  private size = 0

  addFirst(data: T) {
    const newNode = new DoubleLinkedListNode(data)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }
    this.size++
  }

  addLast(data: T) {
    const newNode = new DoubleLinkedListNode(data)
    if (!this.tail) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.prev = this.tail
      this.tail.next = newNode
      this.tail = newNode
    }
    this.size++
  }

  removeFirst(): T | null {
    if (!this.head) {
      return null
    }
    const data = this.head.data
    this.head = this.head.next
    if (this.head) {
      this.head.prev = null
    } else {
      this.tail = null
    }
    this.size--
    return data
  }

  removeLast(): T | null {
    if (!this.tail) {
      return null
    }
    const data = this.tail.data
    this.tail = this.tail.prev
    if (this.tail) {
      this.tail.next = null
    } else {
      this.head = null
    }
    this.size--
    return data
  }

  getSize(): number {
    return this.size
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  clear() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  toArray(): T[] {
    const result: T[] = []
    let current = this.head
    while (current) {
      result.push(current.data)
      current = current.next
    }
    return result
  }

  add(index: number, data: T) {
    if (index < 0 || index > this.size) {
      throw new Error('索引越界')
    }

    if (index === 0) return this.addFirst(data)
    if (index === this.size) return this.addLast(data)

    let current = this.head
    for (let i = 0; i < index; i++) current = current!.next

    const node = new DoubleLinkedListNode(data)
    current!.insertBefore(node)
    this.size++
  }

  remove(index: number): T | null {
    if (index < 0 || index >= this.size) {
      throw new Error('删除失败，索引越界')
    }

    if (index === 0) return this.removeFirst()
    if (index === this.size - 1) return this.removeLast()

    let current = this.head
    for (let i = 0; i < index; i++) current = current!.next

    const data = current!.data
    current!.remove()
    this.size--
    return data
  }

  removeNode(node: DoubleLinkedListNode<T>): void {
    if (!node || !this.head) return

    if (node === this.head) {
      this.removeFirst()
      return
    }

    if (node === this.tail) {
      this.removeLast()
      return
    }

    node.remove()
    this.size--
  }

  get(index: number): T {
    if (index < 0 || index >= this.size) {
      throw new Error('获取失败，索引越界')
    }

    let current: DoubleLinkedListNode<T>
    // 优化：从更近的一端开始遍历
    if (index < this.size / 2) {
      current = this.head!
      for (let i = 0; i < index; i++) {
        current = current.next!
      }
    } else {
      current = this.tail!
      for (let i = this.size - 1; i > index; i--) {
        current = current.prev!
      }
    }
    return current.data
  }

  set(index: number, data: T): void {
    if (index < 0 || index >= this.size) throw new Error('修改失败，索引越界')

    let current: DoubleLinkedListNode<T>
    // 优化：从更近的一端开始遍历
    if (index < this.size / 2) {
      current = this.head!
      for (let i = 0; i < index; i++) {
        current = current.next!
      }
    } else {
      current = this.tail!
      for (let i = this.size - 1; i > index; i--) {
        current = current.prev!
      }
    }

    current.data = data
  }
}
