import {
  BoxGeometry,
  Color,
  Layers,
  Mesh,
  MeshBasicMaterial,
  NoBlending,
  NormalBlending,
  PerspectiveCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Renderer,
  ShaderMaterial,
  Texture,
  UniformsUtils,
  WebGLRenderTarget,
} from 'three'
import { IThreeTest } from '../util/IThreeTest'
import { Random } from 'mockjs'
import { EffectComposer, FullScreenQuad, OrbitControls, OutputShader, RenderPass, UnrealBloomPass } from 'three/examples/jsm/Addons.js'
import { debugTexture } from '../util/debug/DebugTexture'
import { Pane } from 'tweakpane'
import { threeUtil } from '../util/ThreeUtil'
import { glUtil } from '../util/GLUtil'

/**
 * 泛光
 *
 * shadertoy参考
 * https://www.shadertoy.com/view/lsBfRc
 */
class BloomShader implements IThreeTest {
  controls: OrbitControls

  cube: Mesh
  offScreenLayerIndex = 2
  offScreenCamera: PerspectiveCamera
  composer: EffectComposer
  renderScenePass: RenderPass
  bloomPass: UnrealBloomPass
  pane: Pane

  enableBlend = true

  // TODO: 其他的glsl使用一个星号
  vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  fragmentShader = /* glsl */ `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    uniform vec3 color;

    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      texel.rgb *= color;
      gl_FragColor = texel;
    }
  `

  test_fragmentShader = /* glsl */ `
		precision highp float;

    uniform sampler2D tDiffuse;
    varying vec2 vUv;

    void main() {
      // gl_FragColor = texture2D(tDiffuse, vUv);
      gl_FragColor = vec4(texture2D(tDiffuse, vUv).rgb, 0.5);


      // gl_FragColor = vec4(1.0, 0.0, 0.0, 0.1);
    }
  `

  test_OutputFragmentShader = /* glsl */ `
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`

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

    // TEST
    win.threeUtil = threeUtil
    win.glUtil = glUtil
    win.gl = threeEntry.renderer.getContext()

    glUtil.initEnumMap()
  }

  private addControls() {
    this.controls = new OrbitControls(threeEntry.camera, threeEntry.canvas)
    // TODO: 这个用鼠标交互起来很奇怪，一卡一卡的，临时关闭了
    // this.controls.enableDamping = true
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

  // TEST
  private hasRender = false
  private renderRT: WebGLRenderTarget
  private plane: Mesh
  render = () => {
    if (this.hasRender) {
      return
      if (!this.plane) {
        const startZ = 1
        const mtl = new MeshBasicMaterial({ transparent: true, opacity: 1 })
        const plane = new Mesh(new PlaneGeometry(2, 2), mtl)
        threeEntry.testRoot.add(plane)
        plane.position.set(0, 0, startZ)
        this.plane = plane
        mtl.map = this.renderRT.texture

        // TEST
        // setTimeout(() => {
        //   threeUtil.downloadTexture(mtl.map, 'bloom.png')
        // }, 1000)

        const addPlaneBg = () => {
          const planeBgMtl = new MeshBasicMaterial({ transparent: true, color: 0xffffff, opacity: 0.5 })
          const planeBg = new Mesh(new PlaneGeometry(2, 2), planeBgMtl)
          threeEntry.testRoot.add(planeBg)
          let z = -1 + startZ
          planeBg.position.set(0, 0, z)

          setInterval(() => {
            z = Math.sin(Date.now() / 1000) + startZ
            planeBg.position.set(0, 0, z)
          }, 1)
        }
        // addPlaneBg()
      }

      // TEST
      if (win.downloadFinal) {
        win.downloadFinal = false
        const mtl = this.plane.material as MeshBasicMaterial
        threeUtil.downloadTexture(mtl.map, 'bloom.png')
      }

      return
    }
    this.hasRender = true

    // TEST
    // if (!win.gl) {
    //   win.gl = threeEntry.renderer.getContext()
    //   const clear = win.gl.clear
    //   win.gl.clear = function () {
    //     if (win.needDebugger) {
    //       debugger
    //     }
    //     clear.apply(this, arguments)
    //   }

    //   // monitor enableBlend
    //   const enable = win.gl.enable
    //   win.gl.enable = function () {
    //     if (arguments[0] === win.gl.BLEND) {
    //       if (win.needDebugger) {
    //         debugger
    //       }
    //     }
    //     enable.apply(this, arguments)
    //   }

    //   const disable = win.gl.disable
    //   win.gl.disable = function () {
    //     if (arguments[0] === win.gl.BLEND) {
    //       if (win.needDebugger) {
    //         debugger
    //       }
    //     }
    //     disable.apply(this, arguments)
    //   }
    // }

    const enableBlend = true
    if (enableBlend) {
      threeEntry.renderer.state.setBlending(NormalBlending)
    }

    // TEST
    // win.needDebugger = true
    this.composer.render()
    // win.needDebugger = false

    // TODO: 这里的renderbuffer默认没有clear，感觉可能需要手动清空为alpha0
    const renderer = threeEntry.renderer

    const outputMaterial = new RawShaderMaterial({
      vertexShader: OutputShader.vertexShader,
      // fragmentShader: OutputShader.fragmentShader,
      // fragmentShader: this.test_OutputFragmentShader,
      fragmentShader: this.test_fragmentShader,
      uniforms: UniformsUtils.clone(OutputShader.uniforms),
      transparent: true,
    })
    const fsQuad = new FullScreenQuad(outputMaterial)
    outputMaterial.uniforms.tDiffuse.value = this.composer.readBuffer.texture
    // TEST
    // outputMaterial.uniforms.tDiffuse.value = debugTexture.getCircleTexture()

    // TEST: 重新作为canvas然后使用
    const test_canvas = () => {
      const canvas = threeUtil.rt2Canvas(this.composer.readBuffer)
      if (!win.downloadCanvas) {
        win.downloadCanvas = true
        threeUtil.downloadCanvas(canvas, 'canvas.png')
      }
      // if (!win.forceDisplayCanvas) {
      //   threeUtil.forceDisplayCanvas(canvas)
      //   win.forceDisplayCanvas = true
      // }

      // using a plane
      const texture = new Texture(canvas)
      texture.needsUpdate = true
      const plane = new Mesh(new PlaneGeometry(2, 2), new MeshBasicMaterial({ map: texture, transparent: true }))
      plane.position.set(0, 0, 1)
      threeEntry.testRoot.add(plane)
    }
    // test_canvas()

    // TEST
    this.renderRT = this.composer.readBuffer

    outputMaterial.uniforms.toneMappingExposure.value = renderer.toneMappingExposure

    // TODO: 是否有需要销毁的逻辑？

    // TEST: 这里测试下载下来是正常的
    if (!win.downloadFinal) {
      win.downloadFinal = true

      // NOTE: 经过测试，问题出现在这里，直接下载rt是可以得到透明的，但是经过render之后无法透明，暂时不知道原因
      // threeUtil.downloadRT(this.composer.readBuffer, 'bloom.png')
      // threeUtil.downloadTexture(this.composer.readBuffer.texture, 'bloom.png')

      // -- using a plane
      const textureReadBuffer = this.composer.readBuffer.texture
      const textureCanvas = new Texture(threeUtil.rt2Canvas(this.composer.readBuffer))
      debugger
      const texture = textureCanvas
      texture.needsUpdate = true
      const plane = new Mesh(new PlaneGeometry(2, 2), new MeshBasicMaterial({ map: texture, transparent: true }))
      plane.position.set(0, 0, 1)
      threeEntry.testRoot.add(plane)
    }

    // const preAutoClear = renderer.autoClear
    // renderer.autoClear = false
    // fsQuad.render(renderer)
    // renderer.autoClear = preAutoClear

    if (enableBlend) {
      threeEntry.renderer.state.setBlending(NoBlending)
    }
  }

  clear() {
    this.controls.dispose()
    this.composer.dispose()
    this.bloomPass.dispose()
    this.pane.dispose()
  }
}

export const bloomShader = new BloomShader()
