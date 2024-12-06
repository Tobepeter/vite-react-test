import { Mesh } from 'three'
import { IThreeTest } from '../util/IThreeTest'
import { BoxGeometry, MeshBasicMaterial } from 'three'

class CubeTest implements IThreeTest {
  cube: Mesh

  init() {
    this.cube = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0xff0000 })
    )
    threeEntry.testRoot.add(this.cube)

    const camera = threeEntry.camera
    camera.position.set(0, 0, 5)
  }

  update(delta: number) {
    this.cube.rotation.y += delta
  }
}

export const cubeTest = new CubeTest()
