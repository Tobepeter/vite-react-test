import {
  BoxGeometry,
  Color,
  Mesh,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  Vector4,
} from 'three'
import { IThreeTest } from '../util/IThreeTest'
import { debugTexture } from '../util/debug/DebugTexture'

class BrightnessShader implements IThreeTest {
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
    uniform float brightness;
    uniform vec3 color;

    vec3 mixColor(vec3 color1, vec3 color2, vec3 color3, float brightness) {
      float t = smoothstep(0.0, 0.5, brightness);     // 第一阶段：黑色到原色
      float s = smoothstep(0.5, 1.0, brightness);     // 第二阶段：原色到白色
      vec3 color12 = mix(color1, color2, t);
      vec3 color23 = mix(color2, color3, s);
      return brightness < 0.5 ? color12 : color23;
    }

    void main() {
        vec4 texel = texture2D(tDiffuse, vUv);
        texel.rgb  *= color;

        // 0 黑色，0.5 原始颜色，1 白色
        texel.rgb = mix(vec3(0.0), mix(texel.rgb, vec3(1.0), brightness * 2.0 - 1.0), min(brightness * 2.0, 1.0));
        gl_FragColor = texel;
    }
  `

  cube: Mesh

  private pane: any

  init() {
    const material = new ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        brightness: { value: 0.5 },
        color: { value: new Color(0xffff00) },
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

    material.uniforms.tDiffuse.value = texture
    threeEntry.testRoot.add(this.cube)

    // -- 调试面板 --
    const params = {
      brightness: material.uniforms.brightness.value,
    }
    this.pane = new win.Tweakpane.Pane()
    this.pane
      .addInput(params, 'brightness', {
        min: 0,
        max: 1,
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

export const brightnessShader = new BrightnessShader()
