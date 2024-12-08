import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  ShaderMaterial,
} from 'three'
import { IThreeTest } from '../util/IThreeTest'
import { Random } from 'mockjs'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { debugTexture } from '../util/debug/DebugTexture'

/**
 * 泛光
 *
 * shadertoy参考
 * https://www.shadertoy.com/view/lsBfRc
 */
class BloomShader implements IThreeTest {
  envCubes: Mesh[] = []
  controls: OrbitControls

  cube: Mesh

  vertexShader = /** glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  fragmentShader = /** glsl */ `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    uniform vec3 color;

    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      texel.rgb *= color;
      gl_FragColor = texel;
    }
  `

  init() {
    this.createEnvCubes()
    this.addControls()
    this.initCube()
  }

  private addControls() {
    this.controls = new OrbitControls(threeEntry.camera, threeEntry.canvas)
    this.controls.enableDamping = true
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

      const color = new Color(Random.color())
      const mtl = envCube.material as MeshBasicMaterial
      mtl.color = color

      threeEntry.testRoot.add(envCube)
      this.envCubes.push(envCube)
    }
  }

  private initCube() {
    const mtl = new ShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: {
        tDiffuse: {
          value: null,
        },
        color: {
          value: new Color(0xffff00),
        },
      },
    })

    this.cube = new Mesh(new BoxGeometry(), mtl)
    threeEntry.testRoot.add(this.cube)

    const texture = debugTexture.chessboard
    mtl.uniforms.tDiffuse.value = texture
  }

  clear() {
    this.controls.dispose()
  }
}

export const bloomShader = new BloomShader()
