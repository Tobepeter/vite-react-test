import { webGLUtils } from '../utils/WebGLUtils'
import { webGLEntry } from '../WebGLEntry'
import { IWebGLTest } from '../utils/IWebGLTest'

/**
 * 测试renderTarget默认是透明的还是黑色的
 *
 * 结论
 * 1. 想要RT透明，要开启blend
 * 2. 如果不开启blend，RT如果不clear，rt默认其实是透明的，但是会顶掉绘制canvas的颜色，导致看到body
 * 3. 只有开启了blend，才能保留背景色
 * 4. 如果不开启canvas透明，并且关闭了blend，rt的alpha通道不重要，canvas背景直接采纳rt的颜色
 *    如果开启blend，走正常blend的逻辑
 */
class WebGLRTDefault implements IWebGLTest {
  enableCtxAlpha = true
  canClearRT = true
  enableBlend = false
  clearMainColor = [1.0, 0.0, 0.0, 1.0] as const
  clearColorRT = [0.0, 0.0, 1.0, 0.0] as const
  rtSize = [512, 512] as const
  verbose = true

  vs = /* glsl */ `
    attribute vec4 a_position;
    void main() {
      gl_Position = a_position;
    }
  `

  fs = /* glsl */ `
    void main() {
      gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // 绿色三角形
    }
  `

  // 用于将renderTarget渲染到屏幕的着色器
  screenVs = /* glsl */ `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = a_position;
      v_texCoord = a_texCoord;
    }
  `

  screenFs = /* glsl */ `
    precision mediump float;
    uniform sampler2D u_texture;
    varying vec2 v_texCoord;
    void main() {
      gl_FragColor = texture2D(u_texture, v_texCoord);
    }
  `

  gl: WebGLRenderingContext
  program: WebGLProgram
  screenProgram: WebGLProgram
  buffer: WebGLBuffer
  screenBuffer: WebGLBuffer
  framebuffer: WebGLFramebuffer
  texture: WebGLTexture

  init() {
    webGLEntry.config.contextParams.alpha = this.enableCtxAlpha

    this.gl = webGLEntry.getGL()

    if (this.verbose) {
      // 如果不开启，alphaBits是0，开启后得到的是8
      console.log('alpha', this.gl.getParameter(this.gl.ALPHA_BITS))
      // 如果不开启，blend是false，开启后得到的是true
      console.log('gl.enable', this.gl.isEnabled(this.gl.BLEND))
    }

    if (this.enableBlend) {
      this.gl.enable(this.gl.BLEND)
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)
    }

    // 给个浅灰色，这样看到时候能知道看到body了
    document.body.style.backgroundColor = 'rgba(200, 200, 200, 1)'

    this.initRenderTarget()
    this.initPrograms()
    this.initBuffers()
    this.render()
  }

  initRenderTarget() {
    const gl = this.gl
    // 创建并设置纹理
    this.texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this.texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 512, 512, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    // 创建并设置framebuffer
    this.framebuffer = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0)
  }

  initPrograms() {
    const gl = this.gl
    // 三角形程序
    this.program = webGLUtils.createProgram(gl, webGLUtils.createShader(gl, gl.VERTEX_SHADER, this.vs), webGLUtils.createShader(gl, gl.FRAGMENT_SHADER, this.fs))
    // 屏幕渲染程序
    this.screenProgram = webGLUtils.createProgram(gl, webGLUtils.createShader(gl, gl.VERTEX_SHADER, this.screenVs), webGLUtils.createShader(gl, gl.FRAGMENT_SHADER, this.screenFs))
  }

  initBuffers() {
    const gl = this.gl
    // 三角形顶点
    const positions = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
    this.buffer = webGLUtils.createBuffer(gl, gl.ARRAY_BUFFER, positions)

    // 全屏四边形顶点
    const screenQuad = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1])
    this.screenBuffer = webGLUtils.createBuffer(gl, gl.ARRAY_BUFFER, screenQuad)
  }

  render() {
    const gl = this.gl

    // 1. 首先在主画布上绘制红色背景
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.clearColor(...this.clearMainColor) // 红色背景
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 2. 在renderTarget上绘制绿色三角形
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer)
    gl.viewport(0, 0, this.rtSize[0], this.rtSize[1])

    gl.useProgram(this.program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    const positionLoc = gl.getAttribLocation(this.program, 'a_position')
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    if (this.canClearRT) {
      gl.clearColor(...this.clearColorRT)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }

    gl.drawArrays(gl.TRIANGLES, 0, 3)

    // 3. 将renderTarget的内容绘制到主画布上
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.useProgram(this.screenProgram)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.screenBuffer)

    const screenPosLoc = gl.getAttribLocation(this.screenProgram, 'a_position')
    const texCoordLoc = gl.getAttribLocation(this.screenProgram, 'a_texCoord')

    gl.enableVertexAttribArray(screenPosLoc)
    gl.enableVertexAttribArray(texCoordLoc)
    gl.vertexAttribPointer(screenPosLoc, 2, gl.FLOAT, false, 16, 0)
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 16, 8)

    gl.bindTexture(gl.TEXTURE_2D, this.texture)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}

export const webGLRTDefault = new WebGLRTDefault()
