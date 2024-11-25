import { goHit } from './demo/GOHit';
import { rectTest } from './demo/RectTest';
import { timeShaderTest } from './demo/TimeShaderTest';

class PixiTest {
  init() {
    // rectTest.init();
    timeShaderTest.init();
    // goHit.init();
  }

  clear() {
    pixiEntry.cleanRoot();
  }
}

export const pixiTest = new PixiTest();

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    pixiTest.clear();
    pixiTest.init();
  });
}
