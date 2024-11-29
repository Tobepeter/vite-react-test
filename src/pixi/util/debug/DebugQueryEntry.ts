import qs from 'qs';
import { ITest } from '../ITest';

/**
 * 根据query参数运行测试
 */
class DebugQueryEntry {
  run(testMap: Record<string, ITest>) {
    const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    let testName = query.testKey;

    if (!testName || typeof testName !== 'string') {
      return;
    }

    // 支持一下索引方式，字符串比较难记
    let testIndex = Number(testName);
    if (testIndex >= 0) {
      const testNames = Object.keys(testMap);
      if (testIndex < testNames.length) {
        testName = testNames[testIndex];
      } else {
        console.error(`test index ${testIndex} out of range`);
        return;
      }
    }

    if (testMap[testName]) {
      console.log(`run test: ${testName}`);
      testMap[testName].init();
    } else {
      console.error(`test ${testName} not found`);
    }
  }
}

export const debugQueryEntry = new DebugQueryEntry();
