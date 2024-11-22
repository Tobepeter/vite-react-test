import { scriptLoader } from '../ScriptLoader';
import { debugInject } from './DebugInject';

class DebugUtil {
  isInited = false;

  async init() {
    if (this.isInited) return;
    this.isInited = true;

    await scriptLoader.loadVConsoleInEditor();
    debugInject.init();
  }
}

export const debugUtil = new DebugUtil();

// 副作用不好处理，必须reload
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}
