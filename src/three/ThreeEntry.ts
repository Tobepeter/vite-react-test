import { Scene, WebGLRenderer, PerspectiveCamera, Object3D } from 'three'
import { threeAdapt } from './util/ThreeAdapt'
import { threeGlobal } from './util/ThreeGlobal'
import { threeTest } from './ThreeTest'
import { debugUtil } from './util/debug/DebugUtil'

class ThreeEntry {
  scene: Scene
  renderer: WebGLRenderer
  camera: PerspectiveCamera
  canvas: HTMLCanvasElement
  testRoot: Object3D

  // TODO: ui camera

  isInited = false

  renderCb: Array<() => void> = []

  private renderLoopId = -1

  async init() {
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

    await debugUtil.init()

    threeTest.init()
    this.startRender()
  }

  setupScene() {
    this.camera = new PerspectiveCamera()
    this.camera.name = 'camera'
    this.scene.add(this.camera)

    // 方便一开始看向原点
    this.camera.position.set(0, 0, 5)

    this.testRoot = new Object3D()
    this.testRoot.name = 'testRoot'
    this.scene.add(this.testRoot)
  }

  startRender() {
    // TODO: 有一个 renderer.setAnimationLoop 可以直接使用
    this.renderLoopId = requestAnimationFrame(this.renderLoop)
  }

  renderLoop = () => {
    for (const cb of this.renderCb) {
      cb()
    }

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

    // TODO: 应该有不少webgl资源是需要释放的，比如 geometry, material, texture, renderTarget
    //  需要调用一个基于事件监听的 dispose 方法
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
