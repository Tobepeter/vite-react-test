import {
  BoxGeometry,
  Mesh,
  ShaderMaterial,
  TextureLoader,
  Vector2,
} from 'three'
import { IThreeTest } from '../util/IThreeTest'
import { debugTexture } from '../util/debug/DebugTexture'

class GloomShader implements IThreeTest {
  vertexShader = /** glsl */ `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  fragmentShader = /** glsl */ `
    uniform sampler2D map;
    varying vec2 vUv;

    void main() {
        vec4 color = texture2D(map, vUv);
        gl_FragColor = color;
    }
  `

  cube: Mesh

  init() {
    const material = new ShaderMaterial({
      uniforms: {
        map: { value: null },
      },
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
    })

    this.cube = new Mesh(new BoxGeometry(1, 1, 1), material)
    this.cube.name = 'gloomCube'

    const loader = new TextureLoader()
    const texture = debugTexture.getChessboardTexture()
    // const texture = loader.load(debugTexture.dummyImage)
    // const texture = loader.load(debugTexture.getRandomDummyImg())

    material.uniforms.map.value = texture
    threeEntry.testRoot.add(this.cube)
  }

  update(delta: number) {
    this.cube.rotation.y += delta
  }
}

export const gloomShader = new GloomShader()
