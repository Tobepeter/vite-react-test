import { hmr } from '../Hmr'
import { scriptLoader } from '../ScriptLoader'
import { debugInject } from './DebugInject'
import { debugTexture } from './DebugTexture'
import { debugVisual } from './DebugVisual'

class DebugUtil {
  activeChromeDevtools = true

  @hmr.oneCall
  async init() {
    await scriptLoader.loadVConsoleInEditor()
    await scriptLoader.loadTweakpane()
    await scriptLoader.laodStats()

    this.initChromeDevtools()
    debugInject.init()
    debugTexture.init()
    debugVisual.init()
  }

  private initChromeDevtools() {
    if (!this.activeChromeDevtools) return
    // 设置 chrome devtools 扩展对象
    // DOC: https://pixijs.io/devtools/docs/guide/installation/

    // TODO: 不知道为什么，有时候hmr会导致disconnect
    win.__PIXI_APP__ = pixiEntry.app

    Object.defineProperty(win, 'devObj', {
      get: () => {
        return win.$pixi
      },
    })
  }
}

export const debugUtil = new DebugUtil()

// 副作用不好处理，必须reload
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload()
  })
}
