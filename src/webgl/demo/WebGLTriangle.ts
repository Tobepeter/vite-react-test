import { webGLUtils } from '../utils/WebGLUtils'
import { webGLEntry } from '../WebGLEntry'
import { IWebGLTest } from '../utils/IWebGLTest'

class WebGLTriangle implements IWebGLTest {
  vs = /* glsl */ `
    attribute vec4 a_position;
    void main() {
      gl_Position = a_position;
    }
  `

  fs = /* glsl */ `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `

  gl: WebGLRenderingContext
  vertexShader: WebGLShader
  fragmentShader: WebGLShader
  program: WebGLProgram
  buffer: WebGLBuffer

  init() {
    this.gl = webGLEntry.getGL()
    this.prepareProgram()
    this.prepareBuffer()
    this.render()
  }

  prepareProgram() {
    this.vertexShader = webGLUtils.createShader(this.gl, this.gl.VERTEX_SHADER, this.vs)
    this.fragmentShader = webGLUtils.createShader(this.gl, this.gl.FRAGMENT_SHADER, this.fs)
    this.program = webGLUtils.createProgram(this.gl, this.vertexShader, this.fragmentShader)
  }

  prepareBuffer() {
    const positions = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
    this.buffer = webGLUtils.createBuffer(this.gl, this.gl.ARRAY_BUFFER, positions)
  }

  render() {
    const gl = this.gl

    gl.useProgram(this.program)

    const positionAttributeLocation = gl.getAttribLocation(this.program, 'a_position')
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3)
  }
}

export const webGLTriangle = new WebGLTriangle()
