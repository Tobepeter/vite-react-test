import * as THREE from 'three'
import { threeEntry } from '../ThreeEntry'

class ThreeGlobal {
  init() {
    this.injectUnplugin()
    this.injectThree()
    this.injectGlobal()
  }

  private injectUnplugin() {
    win.threeEntry = threeEntry
  }

  private injectThree() {
    win.THREE = THREE
  }

  private injectGlobal() {
    win.renderer = threeEntry.renderer
    win.scene = threeEntry.scene
    win.camera = threeEntry.camera
  }
}

export const threeGlobal = new ThreeGlobal()

declare global {
  const threeEntry: typeof import('../ThreeEntry').threeEntry
  const THREE: typeof import('three')
}
