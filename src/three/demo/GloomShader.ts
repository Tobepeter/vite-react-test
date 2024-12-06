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
    uniform float brightness;

    void main() {
        vec4 color = texture2D(map, vUv);
        color.rgb *= brightness;
        gl_FragColor = color;
    }
  `

  cube: Mesh

  private pane: any

  init() {
    const material = new ShaderMaterial({
      uniforms: {
        map: { value: null },
        brightness: { value: 1.0 },
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

    // -- 调试面板 --
    const params = {
      brightness: material.uniforms.brightness.value,
    }
    this.pane = new win.Tweakpane.Pane()
    this.pane
      .addInput(params, 'brightness', {
        min: 0,
        max: 2,
        step: 0.01,
      })
      .on('change', (obj) => {
        material.uniforms.brightness.value = obj.value
      })
  }

  update(delta: number) {
    this.cube.rotation.y += delta
  }

  destroy() {
    this.pane.dispose()
  }
}

export const gloomShader = new GloomShader()
