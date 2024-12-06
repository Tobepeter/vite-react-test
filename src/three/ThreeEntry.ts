import { Scene, WebGLRenderer, PerspectiveCamera, Object3D } from 'three'
import { threeAdapt } from './util/ThreeAdapt'
import { threeGlobal } from './util/ThreeGlobal'
import { threeTest } from './ThreeTest'

class ThreeEntry {
  scene: Scene
  renderer: WebGLRenderer
  camera: PerspectiveCamera
  canvas: HTMLCanvasElement
  testRoot: Object3D

  // TODO: ui camera

  isInited = false

  private renderLoopId = -1

  init() {
    if (this.isInited) return
    this.isInited = true

    this.scene = new Scene()
    this.renderer = new WebGLRenderer({
      antialias: true,
    })
    this.canvas = this.renderer.domElement

    this.setupScene()

    threeAdapt.init(() => {
      // 默认只是第一次设置，每次设置都会修改canvas宽高
      this.renderer.setPixelRatio(threeAdapt.dpr)
      this.onResize()
    })

    threeGlobal.init()
    threeTest.init()
    this.startRender()
  }

  setupScene() {
    this.camera = new PerspectiveCamera()
    this.camera.name = 'camera'
    this.scene.add(this.camera)

    this.testRoot = new Object3D()
    this.testRoot.name = 'testRoot'
    this.scene.add(this.testRoot)
  }

  startRender() {
    this.renderLoopId = requestAnimationFrame(this.renderLoop)
  }

  renderLoop = () => {
    threeTest.update()

    this.renderer.render(this.scene, this.camera)
    this.renderLoopId = requestAnimationFrame(this.renderLoop)
  }

  stopRender() {
    cancelAnimationFrame(this.renderLoopId)
  }

  cleanTestRoot() {
    const children = this.testRoot.children
    for (const child of children) {
      this.testRoot.remove(child)
    }
  }

  destroy() {
    this.isInited = false
    threeAdapt.destroy()

    this.stopRender()
    this.cleanTestRoot()
    // TODO: 暂时没想到还有什么需要销毁的?
    this.renderer.dispose()
  }

  onResize() {
    if (this.renderer.getPixelRatio() !== threeAdapt.dpr) {
      this.renderer.setPixelRatio(threeAdapt.dpr)
    }
    this.renderer.setSize(threeAdapt.width, threeAdapt.height, true)

    this.camera.aspect = threeAdapt.aspect
    this.camera.updateProjectionMatrix()
  }
}

export const threeEntry = new ThreeEntry()
