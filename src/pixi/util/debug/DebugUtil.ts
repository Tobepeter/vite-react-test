import { hmr } from '../Hmr'
import { scriptLoader } from '../ScriptLoader'
import { debugInject } from './DebugInject'
import { debugTexture } from './DebugTexture'
import { debugVisual } from './DebugVisual'

class DebugUtil {
  activeChromeDevtools = true

  @hmr.oneCall
  async init() {
    if (this.activeChromeDevtools) {
      // 设置 chrome devtools 扩展对象
      // DOC: https://pixijs.io/devtools/docs/guide/installation/
      win.__PIXI_APP__ = pixiEntry.app
    }

    await scriptLoader.loadVConsoleInEditor()
    await scriptLoader.loadTweakpane()
    await scriptLoader.laodStats()

    debugInject.init()
    debugTexture.init()
    debugVisual.init()
  }
}

export const debugUtil = new DebugUtil()

// 副作用不好处理，必须reload
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload()
  })
}
