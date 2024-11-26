import { goHit } from './demo/GOHit';
import { rectTest } from './demo/RectTest';
import { timeShaderTest } from './demo/TimeShaderTest';
import type { ITest } from './util/ITest';

class PixiTest {
  curTest: ITest = null;
  testMap: Record<string, ITest> = {
    rectTest,
    timeShaderTest,
    goHit,
  };

  init() {
    this.curTest = this.testMap.timeShaderTest;
    this.curTest.init();
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
