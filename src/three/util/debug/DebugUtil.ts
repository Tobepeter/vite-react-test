import { threeEntry } from '../../ThreeEntry'
import { hmr } from '../Hmr'
import { scriptLoader } from '../ScriptLoader'
import { debugInject } from './DebugInject'

class DebugUtil {
  @hmr.oneCall
  async init() {
    await scriptLoader.loadVConsoleInEditor()
    await scriptLoader.loadTweakpane()
    await scriptLoader.laodStats()

    debugInject.init()
  }
}

export const debugUtil = new DebugUtil()

// 副作用不好处理，必须reload
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload()
  })
}
