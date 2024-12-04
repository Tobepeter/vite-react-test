import qs from 'qs'
import { ITest } from '../ITest'
import { hmr } from '../Hmr'

/**
 * 根据query参数运行测试
 *
 * TODO: 频繁使用query会导致浏览器的地址history很乱
 */
class DebugQueryRunner {
  printList = true

  @hmr.oneCall
  run(testMap: Record<string, ITest>) {
    const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    let testName = query.testKey

    const testNames = Object.keys(testMap)

    if (this.printList) {
      console.log(`[DebugQueryRunner] test list:`)
      testNames.forEach((name, index) => {
        console.log(`[${index}]: ${name}`)
      })
      console.log('')
    }

    if (!testName || typeof testName !== 'string') {
      return
    }

    // 支持一下索引方式，字符串比较难记
    const testIndex = Number(testName)
    if (testIndex >= 0) {
      if (testIndex < testNames.length) {
        testName = testNames[testIndex]
      } else {
        console.error(
          `[DebugQueryRunner] test index<${testIndex}> out of range`
        )
        return
      }
    }

    if (testMap[testName]) {
      console.log(`[DebugQueryRunner] run test: <${testName}>`)
      testMap[testName].init()
    } else {
      console.error(`[DebugQueryRunner] test<${testName}> not found`)
    }
  }
}

export const debugQueryRunner = new DebugQueryRunner()
