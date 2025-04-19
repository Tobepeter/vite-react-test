import { Button, Card, Space, Typography } from 'antd'

class HashMap {
  private table: Array<Array<[string, any]>>
  private size = 0
  private capacity = 0

  constructor(capacity = 16) {
    this.table = new Array(capacity).fill(null).map(() => [])
    this.size = 0
    this.capacity = capacity
  }

  hash(key: string): number {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i)
      hash = hash & hash // 转换为32位整数
    }
    return Math.abs(hash) % this.capacity
  }

  set(key: string, value: any): void {
    const index = this.hash(key)
    const bucket = this.table[index]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value
        return
      }
    }

    bucket.push([key, value])
    this.size++
  }

  get(key: string): any {
    const index = this.hash(key)
    const bucket = this.table[index]

    for (const [k, v] of bucket) {
      if (k === key) return v
    }
    return undefined
  }

  delete(key: string): boolean {
    const index = this.hash(key)
    const bucket = this.table[index]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1)
        this.size--
        return true
      }
    }
    return false
  }

  has(key: string): boolean {
    const index = this.hash(key)
    const bucket = this.table[index]

    return bucket.some(([k]) => k === key)
  }

  clear(): void {
    this.table = new Array(this.capacity).fill(null).map(() => [])
    this.size = 0
  }

  getSize(): number {
    return this.size
  }
}

export const AlgorithmHashmap = () => {
  const test_hashmap = () => {
    const hashMap = new HashMap()
    hashMap.set('name', 'John')
    hashMap.set('age', 25)
    hashMap.set('city', 'New York')
    console.log(`hashMap.get('name') -> ${hashMap.get('name')}`) // John
    console.log(`hashMap.get('age') -> ${hashMap.get('age')}`) // 25
    console.log(`hashMap.get('city') -> ${hashMap.get('city')}`) // New York
    console.log(`hashMap.has('name') -> ${hashMap.has('name')}`) // true
    console.log(`hashMap.has('gender') -> ${hashMap.has('gender')}`) // false
    hashMap.delete('age')
    console.log(`hashMap.get('age') -> ${hashMap.get('age')}`) // undefined
    hashMap.clear()
    console.log(`hashMap.getSize() -> ${hashMap.getSize()}`) // 0
  }

  const test_hash_func = () => {
    const hashMap = new HashMap()
    const keys = ['name', 'age', 'city']
    for (const key of keys) {
      console.log(`${key} -> ${hashMap.hash(key)}`)
    }
  }
  const buttons = [
    {
      label: '测试哈希表',
      onClick: test_hashmap,
    },
    {
      label: '测试哈希函数',
      onClick: test_hash_func,
    },
  ]

  const { Text, Title } = Typography

  return (
    <Card title='算法-哈希表'>
      <Title level={5}>哈希表</Title>
      <Text>哈希表是一种数据结构，它通过哈希函数将键映射到数组中的一个位置，从而实现快速的查找、插入和删除操作。</Text>
      <Text>哈希表的优点是查找、插入和删除操作的时间复杂度为O(1)，缺点是哈希函数的设计和哈希冲突的解决会影响性能。</Text>
      <Text>哈希表的实现通常使用数组和链表来存储数据，当发生哈希冲突时，可以使用开放寻址法或链表法来解决。</Text>

      <Space direction='vertical' className='mt-4 w-full'>
        {buttons.map(button => (
          <Button key={button.label} type='primary' onClick={button.onClick} block>
            {button.label}
          </Button>
        ))}
      </Space>
    </Card>
  )
}
