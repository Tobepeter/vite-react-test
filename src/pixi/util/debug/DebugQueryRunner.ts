import qs from 'qs';
import { ITest } from '../ITest';

/**
 * 根据query参数运行测试
 */
class DebugQueryRunner {
  printList = true;

  run(testMap: Record<string, ITest>) {
    const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    let testName = query.testKey;

    if (!testName || typeof testName !== 'string') {
      return;
    }

    const testNames = Object.keys(testMap);

    if (this.printList) {
      console.log(`[DebugQueryRunner] test list:`);
      testNames.forEach((name, index) => {
        console.log(`[${index}]: ${name}`);
      });
      console.log('');
    }

    // 支持一下索引方式，字符串比较难记
    let testIndex = Number(testName);
    if (testIndex >= 0) {
      if (testIndex < testNames.length) {
        testName = testNames[testIndex];
      } else {
        console.error(
          `[DebugQueryRunner] test index<${testIndex}> out of range`
        );
        return;
      }
    }

    if (testMap[testName]) {
      console.log(`[DebugQueryRunner] run test: <${testName}>`);
      testMap[testName].init();
    } else {
      console.error(`[DebugQueryRunner] test<${testName}> not found`);
    }
  }
}

export const debugQueryRunner = new DebugQueryRunner();
