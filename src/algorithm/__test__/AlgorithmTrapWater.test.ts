import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { algorithm_trapWater } from '../AlgorithmTrapWater'

describe('algorithm_trapWater', () => {
  test('单v靠左', () => {
    const heightList = [4, 3, 1, 2, 5]
    const result = algorithm_trapWater(heightList)
    expect(result).toBe(6)
  })

  test('单v靠右', () => {
    const heightList = [5, 3, 1, 2, 4]
    const result = algorithm_trapWater(heightList)
    expect(result).toBe(6)
  })

  test('多v', () => {
    const heightList = [4, 3, 1, 2, 5, 4, 3, 2, 1, 2, 3, 4, 5]
    const result = algorithm_trapWater(heightList)
    expect(result).toBe(22)
  })

  test('上升', () => {
    const heightList = [1, 2, 3, 4, 5]
    const result = algorithm_trapWater(heightList)
    expect(result).toBe(0)
  })

  test('下降', () => {
    const heightList = [5, 4, 3, 2, 1]
    const result = algorithm_trapWater(heightList)
    expect(result).toBe(0)
  })

  test('平坦', () => {
    const heightList = [1, 1, 1, 1, 1]
    const result = algorithm_trapWater(heightList)
    expect(result).toBe(0)
  })

  test('反v', () => {
    const heightList = [1, 2, 5, 4, 3]
    const result = algorithm_trapWater(heightList)
    expect(result).toBe(0)
  })

  test('稀疏', () => {
    const heightList = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
    const result = algorithm_trapWater(heightList)
    expect(result).toBe(6)
  })

  // TODO: 支持负数
})
