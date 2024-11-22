import { rectTest } from './demo/RectTest';
import { shaderTest } from './demo/TimeShaderTest';

class PixiTest {
  init() {
    // rectTest.init();
    shaderTest.init();
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
