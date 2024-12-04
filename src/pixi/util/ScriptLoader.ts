class ScriptLoader {
  scriptMap = {
    vConsole:
      'https://cdn.jsdelivr.net/npm/vconsole@3.3.4/dist/vconsole.min.js',
    // NOTE: 只有v3才支持umd，v4强制模块化了
    tweakpane:
      'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js',
    tweakpaneV3:
      'https://cdn.jsdelivr.net/npm/tweakpane@3.1.0/dist/tweakpane.min.js',
    stats: 'https://cdn.jsdelivr.net/npm/stats-js@1.0.1/build/stats.min.js',
  }

  loadedScript: Record<string, { promise: Promise<void>; isDone: boolean }> = {}

  isScriptLoaded(url: string) {
    const info = this.loadedScript[url]
    if (info) {
      return info.isDone
    }
    return false
  }

  loadScript(url: string) {
    if (this.isScriptLoaded(url)) return

    const script = document.createElement('script')
    script.src = url
    document.head.appendChild(script)
    const info = { isDone: false, promise: null }
    this.loadedScript[url] = info

    const promise = new Promise<void>((resolve) => {
      script.onload = () => {
        info.isDone = true
        resolve()
      }
      script.onerror = () => {
        delete this.loadedScript[url]
      }
    })
    info.promise = promise
    return promise
  }

  async loadTweakpane() {
    const url = this.scriptMap.tweakpaneV3
    await this.loadScript(url)
    return win.Tweakpane
  }

  isInEditor() {
    const ua = navigator.userAgent
    const cursorReg = /like Gecko\) Cursor\//
    const codeReg = /like Gecko\) Code\//
    return cursorReg.test(ua) || codeReg.test(ua)
  }

  async loadVConsoleInEditor(action: VConsoleAction = 'create') {
    if (!this.isInEditor()) return
    await this.loadVConsole(action)
  }

  async loadVConsole(action: VConsoleAction = 'create') {
    if (win.VConsole) return
    const url = this.scriptMap.vConsole
    await this.loadScript(url)

    if (action !== 'loadOnly') {
      this.createVConsole()

      if (action === 'open') {
        this.openVConsole()
      }
    }
  }

  createVConsole() {
    if (win.vConsole) return

    // TODO: not work
    // const vConsole = new win.VConsole({ theme: 'dark' })
    const vConsole = new win.VConsole()
    win.vConsole = vConsole
    return vConsole
  }

  isVConsoleReady() {
    return !!win.vConsole
  }

  openVConsole() {
    win.vConsole.show()
  }

  closeVConsole() {
    win.vConsole.hide()
  }

  async laodStats() {
    const url = this.scriptMap.stats
    await this.loadScript(url)
    this.showStats()
  }

  showStats() {
    if (win.stats) return

    const stats = new win.Stats()
    win.stats = stats

    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom)

    function animate() {
      stats.begin()
      // monitored code goes here
      stats.end()

      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }
}

export const scriptLoader = new ScriptLoader()

type VConsoleAction = 'loadOnly' | 'create' | 'open'
