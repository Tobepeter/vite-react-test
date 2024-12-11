class WebGLUtils {
  createShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      return null
    }

    return program
  }

  createBuffer(gl: WebGLRenderingContext, type: number, data: Float32Array) {
    const buffer = gl.createBuffer()
    gl.bindBuffer(type, buffer)
    gl.bufferData(type, data, gl.STATIC_DRAW)
    return buffer
  }
}

export const webGLUtils = new WebGLUtils()
