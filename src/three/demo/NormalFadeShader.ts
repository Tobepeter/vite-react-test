import { BoxGeometry, Color, Mesh, MeshBasicMaterial, ShaderMaterial, SphereGeometry, Vector3 } from 'three'
import { IThreeTest } from '../util/IThreeTest'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { Pane } from 'tweakpane'

/**
 * 基于法线方向的衰减效果
 * 当相机视角垂直于表面时亮度最高，越倾斜越暗
 */
class NormalFadeShader implements IThreeTest {
  controls: OrbitControls
  mesh: Mesh
  envCubes: Mesh[] = []
  pane: Pane

  params = {
    fadeExponent: 2.0,
    color: '#00FFFF',
    brightnessScale: 1.0,
  }

  // 顶点着色器：传递法线和UV
  vertexShader = /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `

  // 片段着色器：计算视角与法线夹角
  fragmentShader = /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    uniform vec3 color;
    uniform float fadeExponent;
    uniform float brightnessScale;

    void main() {
      vec3 viewDir = normalize(-vViewPosition);
      float dotNV = dot(vNormal, viewDir);
      
      float intensity = pow(dotNV, fadeExponent) * brightnessScale;
      
      vec3 finalColor;
      if (intensity <= 1.0) {
        finalColor = mix(vec3(0.0), color, intensity);
      } else {
        finalColor = mix(color, vec3(1.0), intensity - 1.0); // 1~2 之间插值
      }
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `

  init() {
    this.initMesh()
    this.addControls()
    this.createEnvCubes()
    this.initPane()
  }

  private addControls() {
    this.controls = new OrbitControls(threeEntry.camera, threeEntry.canvas)
    this.controls.enableDamping = true
  }

  private initMesh() {
    const mtl = new ShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: {
        color: {
          value: new Color(this.params.color),
        },
        fadeExponent: {
          value: this.params.fadeExponent,
        },
        brightnessScale: {
          value: this.params.brightnessScale,
        },
      },
    })

    const segments = 64
    const geometry = new SphereGeometry(0.5, segments, segments)
    this.mesh = new Mesh(geometry, mtl)
    threeEntry.testRoot.add(this.mesh)
  }

  private createEnvCubes() {
    const envCubeCount = 30
    const envCubeRanges = [0.3, 2.0]
    const envCubeSize = 0.1

    for (let i = 0; i < envCubeCount; i++) {
      const envCube = new Mesh(new BoxGeometry(), new MeshBasicMaterial())

      let x = Math.random() * (envCubeRanges[1] - envCubeRanges[0]) + envCubeRanges[0]
      if (Math.random() > 0.5) {
        x = -x
      }
      let y = Math.random() * (envCubeRanges[1] - envCubeRanges[0]) + envCubeRanges[0]
      if (Math.random() > 0.5) {
        y = -y
      }
      envCube.position.set(x, y, 0)
      envCube.scale.set(envCubeSize, envCubeSize, envCubeSize)

      const color = new Color(Math.random() * 0xffffff)
      const mtl = envCube.material as MeshBasicMaterial
      mtl.color = color

      threeEntry.testRoot.add(envCube)
      this.envCubes.push(envCube)
    }
  }

  private initPane() {
    this.pane = new Pane()

    this.pane
      .addBinding(this.params, 'fadeExponent', {
        min: 1, // NOTE: 如果小于1，外侧会更亮
        max: 3.0,
        step: 0.05,
        label: '衰减系数',
      })
      .on('change', ev => {
        const material = this.mesh.material as ShaderMaterial
        material.uniforms.fadeExponent.value = ev.value
      })

    this.pane
      .addBinding(this.params, 'brightnessScale', {
        min: 0,
        max: 4.0,
        step: 0.1,
        label: '亮度修正',
      })
      .on('change', ev => {
        const material = this.mesh.material as ShaderMaterial
        material.uniforms.brightnessScale.value = ev.value
      })

    this.pane
      .addBinding(this.params, 'color', {
        label: '颜色',
        view: 'color',
      })
      .on('change', ev => {
        const material = this.mesh.material as ShaderMaterial
        const color = new Color(ev.value)
        material.uniforms.color.value.set(color)
      })
  }

  clear() {
    this.controls.dispose()
    this.pane.dispose()
    this.envCubes.forEach(cube => {
      threeEntry.testRoot.remove(cube)
      cube.geometry.dispose()
      ;(cube.material as MeshBasicMaterial).dispose()
    })
    this.envCubes = []
  }
}

export const normalFadeShader = new NormalFadeShader()
