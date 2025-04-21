/**
 * 链表节点类
 */
export class ListNode<T> {
  val: T
  next: ListNode<T> | null

  constructor(val: T, next: ListNode<T> | null = null) {
    this.val = val
    this.next = next
  }

  toString(): string {
    return `ListNode(val: ${this.val})`
  }
}

/**
 * 链表类
 */
export class LinkedList<T> {
  private head: ListNode<T> | null
  private size: number

  constructor() {
    this.head = null
    this.size = 0
  }

  getSize() {
    return this.size
  }

  isEmpty() {
    return this.size === 0
  }

  addFirst(val: T) {
    const newNode = new ListNode(val)
    newNode.next = this.head
    this.head = newNode
    this.size++
  }

  addLast(val: T) {
    if (this.isEmpty()) {
      this.addFirst(val)
      return
    }

    let current = this.head
    while (current?.next) {
      current = current.next
    }
    current!.next = new ListNode(val)
    this.size++
  }

  add(index: number, val: T) {
    if (index < 0 || index > this.size) {
      throw new Error('添加失败，索引越界')
    }

    if (index === 0) {
      this.addFirst(val)
      return
    }

    let prev = this.head
    for (let i = 0; i < index - 1; i++) {
      prev = prev!.next
    }

    const newNode = new ListNode(val)
    newNode.next = prev!.next
    prev!.next = newNode
    this.size++
  }

  remove(index: number): T {
    if (index < 0 || index >= this.size) {
      throw new Error('删除失败，索引越界')
    }

    if (index === 0) {
      const val = this.head!.val
      this.head = this.head!.next
      this.size--
      return val
    }

    let prev = this.head
    for (let i = 0; i < index - 1; i++) {
      prev = prev!.next
    }

    const val = prev!.next!.val
    prev!.next = prev!.next!.next
    this.size--
    return val
  }

  removeNode(node: ListNode<T>) {
    if (!node || !this.head) {
      return
    }

    // 如果是头节点
    if (this.head === node) {
      this.head = node.next
      this.size--
      return
    }

    // 查找节点
    let previous = this.head
    let current = previous.next
    while (current && current !== node) {
      previous = current
      current = current.next
    }

    // 如果找到了节点
    if (current) {
      previous.next = current.next
      this.size--
    }
  }

  removeValue(val: T, all = false) {
    if (!this.head) {
      return
    }

    // 如果头节点就是要删除的节点
    if (this.head.val === val) {
      this.head = this.head.next
      this.size--
      return
    }

    // 遍历链表
    let previous = this.head
    let current = previous.next
    while (current) {
      if (current.val === val) {
        previous.next = current.next
        this.size--
        current = current.next
        if (!all) {
          break
        }
      } else {
        previous = current
        current = current.next
      }
    }
  }

  get(index: number): T {
    if (index < 0 || index >= this.size) {
      throw new Error('获取失败，索引越界')
    }

    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current!.next
    }
    return current!.val
  }

  set(index: number, val: T) {
    if (index < 0 || index >= this.size) {
      throw new Error('修改失败，索引越界')
    }

    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current!.next
    }
    current!.val = val
  }

  toArray(): T[] {
    const result: T[] = []
    let current = this.head
    while (current) {
      result.push(current.val)
      current = current.next
    }
    return result
  }

  clear() {
    this.head = null
    this.size = 0
  }
}
