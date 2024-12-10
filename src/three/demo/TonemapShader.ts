import { ShaderMaterial } from 'three'
import { IThreeTest } from '../util/IThreeTest'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { Pane } from 'tweakpane'
import { BoxGeometry, Color, Mesh, MeshBasicMaterial } from 'three'

class TonemapShader implements IThreeTest {
  controls: OrbitControls
  mesh: Mesh
  envCubes: Mesh[] = []
  pane: Pane

  params = {
    exposure: 1.5,
    gamma: 2.2,
    color: '#ff8033',
  }

  vs = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  simpleReinhardTone_fs = /* glsl */ `
    uniform float exposure;
    uniform float gamma;
    uniform vec3 color;
    
    varying vec2 vUv;

    vec3 simpleReinhardToneMapping(vec3 color) {
      color *= exposure / (1. + color / exposure);
      color = pow(color, vec3(1. / gamma));
      return color;
    }

    void main() {
      vec3 mappedColor = simpleReinhardToneMapping(color);
      gl_FragColor = vec4(mappedColor, 1.0);
    }
  `

  init() {
    this.addControls()
    this.createEnvCubes()
    this.initMesh()
    this.initPane()
  }

  private initMesh() {
    const material = this.getSimpleReinhardTone()
    const geometry = new BoxGeometry(1, 1, 1)
    this.mesh = new Mesh(geometry, material)
    threeEntry.testRoot.add(this.mesh)
  }

  private getSimpleReinhardTone() {
    const shaderMaterial = new ShaderMaterial({
      vertexShader: this.vs,
      fragmentShader: this.simpleReinhardTone_fs,
      uniforms: {
        color: { value: new Color(this.params.color) },
        exposure: { value: this.params.exposure },
        gamma: { value: this.params.gamma },
      },
    })
    return shaderMaterial
  }

  private addControls() {
    this.controls = new OrbitControls(threeEntry.camera, threeEntry.canvas)
    this.controls.enableDamping = true
  }

  private createEnvCubes() {
    const envCubeCount = 30
    const envCubeRanges = [0.3, 2.0]
    const envCubeSize = 0.1

    for (let i = 0; i < envCubeCount; i++) {
      const envCube = new Mesh(new BoxGeometry(), new MeshBasicMaterial())

      let x = Math.random() * (envCubeRanges[1] - envCubeRanges[0]) + envCubeRanges[0]
      if (Math.random() > 0.5) x = -x
      let y = Math.random() * (envCubeRanges[1] - envCubeRanges[0]) + envCubeRanges[0]
      if (Math.random() > 0.5) y = -y

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
      .addBinding(this.params, 'exposure', {
        min: 0.1,
        max: 5.0,
        step: 0.1,
        label: '曝光度',
      })
      .on('change', ev => {
        const material = this.mesh.material as ShaderMaterial
        material.uniforms.exposure.value = ev.value
      })

    this.pane
      .addBinding(this.params, 'gamma', {
        min: 1.0,
        max: 4.0,
        step: 0.1,
        label: 'Gamma值',
      })
      .on('change', ev => {
        const material = this.mesh.material as ShaderMaterial
        material.uniforms.gamma.value = ev.value
      })

    this.pane
      .addBinding(this.params, 'color', {
        label: '颜色',
        view: 'color',
      })
      .on('change', ev => {
        const material = this.mesh.material as ShaderMaterial
        material.uniforms.color.value = new Color(ev.value)
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

export const tonemapShader = new TonemapShader()
