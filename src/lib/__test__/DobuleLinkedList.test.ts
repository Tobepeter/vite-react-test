import { beforeEach, describe, expect, test } from 'vitest'
import { DoubleLinkedList, DoubleLinkedListNode } from '../DobuleLinkedList'

describe('DoubleLinkedListNode', () => {
  let node: DoubleLinkedListNode<number>
  let prevNode: DoubleLinkedListNode<number>
  let nextNode: DoubleLinkedListNode<number>

  beforeEach(() => {
    node = new DoubleLinkedListNode(2)
    prevNode = new DoubleLinkedListNode(1)
    nextNode = new DoubleLinkedListNode(3)
  })

  test('节点初始化正确', () => {
    expect(node.data).toBe(2)
    expect(node.prev).toBeNull()
    expect(node.next).toBeNull()
  })

  test('toString方法正确输出', () => {
    expect(node.toString()).toBe('DoubleLinkedListNode(data: 2)')
  })

  test('insertBefore方法正确插入节点', () => {
    node.insertBefore(prevNode)
    expect(node.prev).toBe(prevNode)
    expect(prevNode.next).toBe(node)
  })

  test('insertAfter方法正确插入节点', () => {
    node.insertAfter(nextNode)
    expect(node.next).toBe(nextNode)
    expect(nextNode.prev).toBe(node)
  })

  test('remove方法正确移除节点', () => {
    node.insertBefore(prevNode)
    node.insertAfter(nextNode)
    node.remove()
    expect(prevNode.next).toBe(nextNode)
    expect(nextNode.prev).toBe(prevNode)
    expect(node.prev).toBeNull()
    expect(node.next).toBeNull()
  })
})

describe('DoubleLinkedList', () => {
  let list: DoubleLinkedList<number>

  beforeEach(() => {
    list = new DoubleLinkedList<number>()
  })

  test('初始化空链表', () => {
    expect(list.isEmpty()).toBeTruthy()
    expect(list.getSize()).toBe(0)
    expect(list.toArray()).toEqual([])
  })

  describe('添加操作', () => {
    test('addFirst正确添加元素', () => {
      list.addFirst(1)
      list.addFirst(2)
      expect(list.toArray()).toEqual([2, 1])
      expect(list.getSize()).toBe(2)
    })

    test('addLast正确添加元素', () => {
      list.addLast(1)
      list.addLast(2)
      expect(list.toArray()).toEqual([1, 2])
      expect(list.getSize()).toBe(2)
    })

    test('add在指定位置正确添加元素', () => {
      list.addLast(1)
      list.addLast(3)
      list.add(1, 2)
      expect(list.toArray()).toEqual([1, 2, 3])
      expect(list.getSize()).toBe(3)
    })

    test('add索引越界时抛出异常', () => {
      expect(() => list.add(-1, 1)).toThrow('索引越界')
      expect(() => list.add(1, 1)).toThrow('索引越界')
    })
  })

  describe('删除操作', () => {
    beforeEach(() => {
      list.addLast(1)
      list.addLast(2)
      list.addLast(3)
    })

    test('removeFirst正确删除元素', () => {
      expect(list.removeFirst()).toBe(1)
      expect(list.toArray()).toEqual([2, 3])
      expect(list.getSize()).toBe(2)
    })

    test('removeLast正确删除元素', () => {
      expect(list.removeLast()).toBe(3)
      expect(list.toArray()).toEqual([1, 2])
      expect(list.getSize()).toBe(2)
    })

    test('remove正确删除指定位置元素', () => {
      expect(list.remove(1)).toBe(2)
      expect(list.toArray()).toEqual([1, 3])
      expect(list.getSize()).toBe(2)
    })

    test('remove索引越界时抛出异常', () => {
      expect(() => list.remove(-1)).toThrow('删除失败，索引越界')
      expect(() => list.remove(3)).toThrow('删除失败，索引越界')
    })
  })

  describe('查询和修改操作', () => {
    beforeEach(() => {
      list.addLast(1)
      list.addLast(2)
      list.addLast(3)
    })

    test('get正确获取元素', () => {
      expect(list.get(0)).toBe(1)
      expect(list.get(1)).toBe(2)
      expect(list.get(2)).toBe(3)
    })

    test('get索引越界时抛出异常', () => {
      expect(() => list.get(-1)).toThrow('获取失败，索引越界')
      expect(() => list.get(3)).toThrow('获取失败，索引越界')
    })

    test('set正确修改元素', () => {
      list.set(1, 4)
      expect(list.toArray()).toEqual([1, 4, 3])
    })

    test('set索引越界时抛出异常', () => {
      expect(() => list.set(-1, 4)).toThrow('修改失败，索引越界')
      expect(() => list.set(3, 4)).toThrow('修改失败，索引越界')
    })
  })

  test('clear正确清空链表', () => {
    list.addLast(1)
    list.addLast(2)
    list.clear()
    expect(list.isEmpty()).toBeTruthy()
    expect(list.getSize()).toBe(0)
    expect(list.toArray()).toEqual([])
  })
})
