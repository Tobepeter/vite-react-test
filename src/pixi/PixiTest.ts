import { goHit } from './demo/GOHit';
import { memTest } from './demo/MemTest';
import { rectTest } from './demo/RectTest';
import { timeShaderTest } from './demo/TimeShaderTest';
import { debugQueryRunner } from './util/debug/DebugQueryRunner';
import type { ITest } from './util/ITest';
import qs from 'qs';

class PixiTest {
  curTest: ITest = null;
  testMap: Record<string, ITest> = {
    rectTest,
    timeShaderTest,
    goHit,
    memTest,
  };

  init() {
    // this.curTest = this.testMap.memTest;
    // this.curTest.init();

    debugQueryRunner.run(this.testMap);
  }

  clear() {
    // NOTE: 如果指定了clear方法，让测试类自己清理
    if (this.curTest && this.curTest.clear) {
      this.curTest.clear();
    } else {
      pixiEntry.cleanRoot();
    }
    this.curTest = null;
  }
}

export const pixiTest = new PixiTest();

if (import.meta.hot) {
  import.meta.hot.accept((mod) => {
    pixiTest.clear();
    mod.pixiTest.init();
  });
}
