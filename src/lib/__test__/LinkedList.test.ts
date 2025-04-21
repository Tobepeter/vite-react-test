import { describe, test, expect, beforeEach } from 'vitest'
import { LinkedList } from '../LinkedList'

describe('LinkedList', () => {
  let list: LinkedList<number>

  beforeEach(() => {
    list = new LinkedList<number>()
  })

  describe('初始状态', () => {
    test('新创建的链表应该为空', () => {
      expect(list.isEmpty()).toBe(true)
      expect(list.getSize()).toBe(0)
      expect(list.toArray()).toEqual([])
    })
  })

  describe('添加元素', () => {
    test('addFirst 方法应该正确添加元素到头部', () => {
      list.addFirst(1)
      list.addFirst(2)
      expect(list.toArray()).toEqual([2, 1])
      expect(list.getSize()).toBe(2)
    })

    test('addLast 方法应该正确添加元素到尾部', () => {
      list.addLast(1)
      list.addLast(2)
      expect(list.toArray()).toEqual([1, 2])
      expect(list.getSize()).toBe(2)
    })

    test('add 方法应该在指定位置正确添加元素', () => {
      list.addLast(1)
      list.addLast(2)
      list.addLast(3)
      list.add(1, 4)
      expect(list.toArray()).toEqual([1, 4, 2, 3])
      expect(list.getSize()).toBe(4)
    })

    test('add 方法应该在索引越界时抛出错误', () => {
      expect(() => list.add(-1, 1)).toThrow('添加失败，索引越界')
      expect(() => list.add(1, 1)).toThrow('添加失败，索引越界')
    })
  })

  describe('删除元素', () => {
    beforeEach(() => {
      list.addLast(1)
      list.addLast(2)
      list.addLast(3)
    })

    test('remove 方法应该正确删除指定位置的元素', () => {
      const removed = list.remove(1)
      expect(removed).toBe(2)
      expect(list.toArray()).toEqual([1, 3])
      expect(list.getSize()).toBe(2)
    })

    test('remove 方法应该在索引越界时抛出错误', () => {
      expect(() => list.remove(-1)).toThrow('删除失败，索引越界')
      expect(() => list.remove(3)).toThrow('删除失败，索引越界')
    })
  })

  describe('获取和修改元素', () => {
    beforeEach(() => {
      list.addLast(1)
      list.addLast(2)
      list.addLast(3)
    })

    test('get 方法应该正确获取指定位置的元素', () => {
      expect(list.get(0)).toBe(1)
      expect(list.get(1)).toBe(2)
      expect(list.get(2)).toBe(3)
    })

    test('get 方法应该在索引越界时抛出错误', () => {
      expect(() => list.get(-1)).toThrow('获取失败，索引越界')
      expect(() => list.get(3)).toThrow('获取失败，索引越界')
    })

    test('set 方法应该正确修改指定位置的元素', () => {
      list.set(1, 4)
      expect(list.toArray()).toEqual([1, 4, 3])
    })

    test('set 方法应该在索引越界时抛出错误', () => {
      expect(() => list.set(-1, 4)).toThrow('修改失败，索引越界')
      expect(() => list.set(3, 4)).toThrow('修改失败，索引越界')
    })
  })

  describe('其他操作', () => {
    test('clear 方法应该正确清空链表', () => {
      list.addLast(1)
      list.addLast(2)
      list.clear()
      expect(list.isEmpty()).toBe(true)
      expect(list.getSize()).toBe(0)
      expect(list.toArray()).toEqual([])
    })

    test('toArray 方法应该正确转换链表为数组', () => {
      list.addLast(1)
      list.addLast(2)
      list.addLast(3)
      expect(list.toArray()).toEqual([1, 2, 3])
    })
  })

  describe('边界情况', () => {
    test('在空链表上操作', () => {
      expect(() => list.remove(0)).toThrow('删除失败，索引越界')
      expect(() => list.get(0)).toThrow('获取失败，索引越界')
      expect(() => list.set(0, 1)).toThrow('修改失败，索引越界')
    })

    test('在只有一个元素的链表上操作', () => {
      list.addFirst(1)
      expect(list.remove(0)).toBe(1)
      expect(list.isEmpty()).toBe(true)
    })
  })
})
