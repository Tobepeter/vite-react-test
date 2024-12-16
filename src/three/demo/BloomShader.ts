import { BoxGeometry, Color, Layers, Mesh, MeshBasicMaterial, NoBlending, NormalBlending, PerspectiveCamera, RawShaderMaterial, Renderer, ShaderMaterial, UniformsUtils } from 'three'
import { IThreeTest } from '../util/IThreeTest'
import { Random } from 'mockjs'
import { EffectComposer, FullScreenQuad, OrbitControls, OutputShader, RenderPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js'
import { debugTexture } from '../util/debug/DebugTexture'
import { Pane } from 'tweakpane'

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
  offScreenLayerIndex = 2
  offScreenCamera: PerspectiveCamera
  composer: EffectComposer
  renderScenePass: RenderPass
  bloomPass: UnrealBloomPass
  pane: Pane

  enableBlend = true

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
    // 修改body背景颜色，方便观察是否透明
    const modifyBodyBgColor = true
    if (modifyBodyBgColor) {
      document.body.style.backgroundColor = 'rgba(0, 200, 200, 1)'
    }

    const verbose = true
    if (verbose) {
      const renderer = threeEntry.renderer
      const gl = renderer.getContext()
      console.log('gl.getParameter(gl.ALPHA_BITS)', gl.getParameter(gl.ALPHA_BITS))
      console.log('gl.isEnabled(gl.BLEND)', gl.isEnabled(gl.BLEND))
      console.log('gl.getParameter(gl.COLOR_CLEAR_VALUE)', Array.from(gl.getParameter(gl.COLOR_CLEAR_VALUE)))
    }

    this.createEnvCubes()
    this.addControls()
    this.initCube()
    this.initOffScreenCamera()
    this.initEffectComposer()
    this.addPane()
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

    this.cube.layers.set(this.offScreenLayerIndex)
  }

  private initOffScreenCamera() {
    const cam = new PerspectiveCamera()
    cam.copy(threeEntry.camera)
    cam.updateProjectionMatrix()
    cam.layers.set(this.offScreenLayerIndex)
    threeEntry.testRoot.add(cam)
    this.offScreenCamera = cam
  }

  private initEffectComposer() {
    const composer = new EffectComposer(threeEntry.renderer)
    this.composer = composer

    // 不这么设置，bloomPass开始会清除颜色直接上屏
    composer.renderToScreen = false

    this.renderScenePass = new RenderPass(threeEntry.scene, this.offScreenCamera)

    // 默认会自动clear，设置0可以防止重新设置为非透明
    this.renderScenePass.clearAlpha = 0
    composer.addPass(this.renderScenePass)
    const renderPassRender = this.renderScenePass.render
    const enableBlend = this.enableBlend
    this.renderScenePass.render = function () {
      // TODO: 这里内部渲染其实会disable blend，不过直接渲染内容，应该不需要
      //  但是其实感觉暂时没必要在之类关心透明的问题
      renderPassRender.apply(this, arguments as any)
      if (enableBlend) {
        threeEntry.renderer.state.setBlending(NormalBlending)
      }
    }

    this.bloomPass = new UnrealBloomPass(undefined, 1, 0, 0)
    composer.addPass(this.bloomPass)

    // 设置透明，否则会清除颜色
    this.bloomPass.materialHighPassFilter.transparent = true
    this.bloomPass.separableBlurMaterials.forEach(mtl => {
      mtl.transparent = true
    })
    this.bloomPass.compositeMaterial.transparent = true

    threeEntry.postRenderList.push(this.render)
  }

  private addPane() {
    const pane = new Pane()
    this.pane = pane
    const params = {
      threshold: 0.1,
      strength: 0.1,
      radius: 0.1,
    }
    pane
      .addBinding(params, 'threshold', {
        min: 0,
        max: 1,
        step: 0.01,
      })
      .on('change', () => {
        this.bloomPass.threshold = params.threshold
      })
    pane
      .addBinding(params, 'strength', {
        min: 0,
        max: 3,
        step: 0.01,
      })
      .on('change', () => {
        this.bloomPass.strength = params.strength
      })
    pane
      .addBinding(params, 'radius', {
        min: 0,
        max: 1,
        step: 0.01,
      })
      .on('change', () => {
        this.bloomPass.radius = params.radius
      })
  }

  update() {
    const cam = this.offScreenCamera
    // NOTE: copy 会复制layer，需要手动还原回去
    cam.copy(threeEntry.camera)
    cam.layers.set(this.offScreenLayerIndex)
    cam.updateMatrixWorld()
  }

  render = () => {
    // TEST
    if (!win.gl) {
      win.gl = threeEntry.renderer.getContext()
      const clear = win.gl.clear
      win.gl.clear = function () {
        if (win.needDebugger) {
          debugger
        }
        clear.apply(this, arguments)
      }

      // monitor enableBlend
      const enable = win.gl.enable
      win.gl.enable = function () {
        if (arguments[0] === win.gl.BLEND) {
          if (win.needDebugger) {
            debugger
          }
        }
        enable.apply(this, arguments)
      }

      const disable = win.gl.disable
      win.gl.disable = function () {
        if (arguments[0] === win.gl.BLEND) {
          if (win.needDebugger) {
            debugger
          }
        }
        disable.apply(this, arguments)
      }
    }

    const enableBlend = true
    if (enableBlend) {
      threeEntry.renderer.state.setBlending(NormalBlending)
    }

    // TEST
    win.needDebugger = true
    this.composer.render()
    win.needDebugger = false

    // TODO: 这里的renderbuffer默认没有clear，感觉可能需要手动清空为alpha0
    const renderer = threeEntry.renderer

    const outputMaterial = new RawShaderMaterial({
      vertexShader: OutputShader.vertexShader,
      fragmentShader: OutputShader.fragmentShader,
      uniforms: UniformsUtils.clone(OutputShader.uniforms),
      transparent: true,
    })
    const fsQuad = new FullScreenQuad(outputMaterial)
    outputMaterial.uniforms.tDiffuse.value = this.composer.readBuffer.texture
    outputMaterial.uniforms.toneMappingExposure.value = renderer.toneMappingExposure

    // TODO: 是否有需要销毁的逻辑？

    const preAutoClear = renderer.autoClear
    renderer.autoClear = false
    fsQuad.render(renderer)
    renderer.autoClear = preAutoClear

    if (enableBlend) {
      threeEntry.renderer.state.setBlending(NoBlending)
    }

    // TEST
    debugger
  }

  clear() {
    this.controls.dispose()
    this.composer.dispose()
    this.bloomPass.dispose()
    this.pane.dispose()
  }
}

export const bloomShader = new BloomShader()
