import * as THREE from 'three'
import { threeEntry } from '../ThreeEntry'

class ThreeGlobal {
  init() {
    this.injectUnplugin()
    this.injectThree()
  }

  private injectUnplugin() {
    win.threeEntry = threeEntry
  }

  private injectThree() {
    win.THREE = THREE
  }
}

export const threeGlobal = new ThreeGlobal()

declare global {
  const threeEntry: typeof import('../ThreeEntry').threeEntry
  const THREE: typeof import('three')
}
