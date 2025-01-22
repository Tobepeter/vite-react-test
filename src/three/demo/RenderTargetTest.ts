import { IThreeTest } from '../util/IThreeTest'
import { Mesh, MeshBasicMaterial, BoxGeometry, Color, PerspectiveCamera, PlaneGeometry, WebGLRenderTarget, Vector2 } from 'three'
import { Random } from 'mockjs'
import { FullScreenQuad } from 'three/examples/jsm/Addons.js'

class RenderTargetTest implements IThreeTest {
  offScreenLayerIndex = 2
  offScreenCamera: PerspectiveCamera
  renderTarget: WebGLRenderTarget

  init() {}

  private initOffScreenCamera() {
    const cam = new PerspectiveCamera()
    cam.copy(threeEntry.camera)
    cam.updateProjectionMatrix()
    cam.layers.set(this.offScreenLayerIndex)
    threeEntry.testRoot.add(cam)
    this.offScreenCamera = cam
  }

  private createEnvCubes() {
    const envCubeCount = 30
    const envCubeRanges = [0.3, 1.0]
    const envCubeSize = 0.1

    for (let i = 0; i < envCubeCount; i++) {
      const envCube = new Mesh(new BoxGeometry())

      let x = Random.float(envCubeRanges[0], envCubeRanges[1])
      if (Random.boolean()) {
        x = -x
      }
      let y = Random.float(-envCubeRanges[0], envCubeRanges[1])
      if (Random.boolean()) {
        y = -y
      }
      envCube.position.set(x, y, 0)
      envCube.scale.set(envCubeSize, envCubeSize, envCubeSize)
      envCube.layers.set(this.offScreenLayerIndex)

      const color = new Color(Random.color())
      const mtl = envCube.material as MeshBasicMaterial
      mtl.color = color

      threeEntry.testRoot.add(envCube)
    }
  }

  private initPlane() {
    // 两个plane，一前一后，前者是offScreenCamera的渲染目标，后者是一个简单的图片

    const geometry = new PlaneGeometry(1, 1)
    const frontPlane = new Mesh(geometry, new MeshBasicMaterial({ map: this.renderTarget.texture }))
    frontPlane.position.set(0, 0, 1)
    threeEntry.testRoot.add(frontPlane)

    const backPlane = new Mesh(new PlaneGeometry(), new MeshBasicMaterial({ color: 0xffffff }))
    backPlane.position.set(0, 0, -1)
    threeEntry.testRoot.add(backPlane)
  }

  private initRenderTarget() {
    const size = threeEntry.renderer.getSize(new Vector2())
    size.multiplyScalar(threeEntry.renderer.getPixelRatio())
    this.renderTarget = new WebGLRenderTarget(size.x, size.y)

    // render
    const mtl = new MeshBasicMaterial({ map: this.renderTarget.texture })
    const quad = new FullScreenQuad()
  }
}

export const renderTargetTest = new RenderTargetTest()
