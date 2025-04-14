import debug from 'debug'
import delay from 'delay'
import { useEffect } from 'react'

export const LibDebugDemo = () => {
  const test_basic = async () => {
    const log = debug('test:basic')
    log('hello world')
    await delay(1000)
    log('hello world 2')
  }

  const test_multi_namespace = () => {
    const helloLog = debug('hello')
    const worldLog = debug('world')
    const testLog = debug('test')

    helloLog('hello world 1')
    worldLog('hello world 2')
    testLog('hello world 3')
  }

  const test_multi_namespace_hash = () => {
    // NOTE: 内部其实是通过字符串hash判断的，这里面的内容很相近，所以看不出颜色区别
    const log1 = debug('test:multi:1')
    const log2 = debug('test:multi:2')
    const log3 = debug('test:multi:3')
    console.log(`debug.selectColor('test:multi:1'): `, debug.selectColor('test:multi:1'))
    console.log(`debug.selectColor('test:multi:2'): `, debug.selectColor('test:multi:2'))
    console.log(`debug.selectColor('test:multi:3'): `, debug.selectColor('test:multi:3'))

    log1('hello world 1')
    log1('hello world 1')
    log2('hello world 2')
    log3('hello world 3')
  }

  const test_multi_darkmode = () => {
    const log1 = debug('test:multi:1')
    const log2 = debug('test:multi:2')
    const log3 = debug('test:multi:3')

    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    console.log('isDarkMode', isDarkMode)

    const lightColors = ['#4169E1', '#2E8B57', '#CD5C5C']
    const darkColors = ['#87CEEB', '#98FB98', '#FFB6C1']

    log1.color = isDarkMode ? darkColors[0] : lightColors[0]
    log2.color = isDarkMode ? darkColors[1] : lightColors[1]
    log3.color = isDarkMode ? darkColors[2] : lightColors[2]

    log1('hello world 1')
    log2('hello world 2')
    log3('hello world 3')
  }

  const test_extend = () => {
    const log = debug('test')
    // NOTE: 类似进一步划分区间，这里其实就是 test-hello
    const extendLog = log.extend('hello', '-')
    log('hello world 1')
    extendLog('hello world 2')
  }

  useEffect(() => {
    // NOTE: 必须enable，否则不会输出
    // debug.enable('test:*')
    debug.enable('*')

    // test_basic()
    // test_multi_namespace()
    // test_multi_namespace_hash()
    // test_multi_darkmode()
    test_extend()
  }, [])

  return <div>LibDebugDemo</div>
}
