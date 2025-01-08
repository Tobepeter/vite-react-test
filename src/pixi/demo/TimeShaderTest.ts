import { Color, Filter, Sprite, Texture, utils } from 'pixi.js'
import { debugTexture } from '../util/debug/DebugTexture'
import { ITest } from '../util/ITest'

class TimeShaderTest implements ITest {
  vs = /** glsl */ `
  attribute vec2 aVertexPosition;
  uniform mat3 projectionMatrix;
  
  varying vec2 vTextureCoord;
  varying vec2 vVertexPosition;
  
  uniform vec4 inputSize;
  uniform vec4 outputFrame;
  
  vec4 filterVertexPosition(void)
  {
      vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;
  
      return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
  }
  
  vec2 filterTextureCoord(void)
  {
      return aVertexPosition * (outputFrame.zw * inputSize.zw);
  }
  
  void main(void)
  {
      gl_Position = filterVertexPosition();
      vTextureCoord = filterTextureCoord();

      // 相对于默认加的一行，filter的纹理是翻转的，因此y朝下，原点在左上角
      vVertexPosition = aVertexPosition;
  }
  `

  fs = /** glsl */ `
  precision mediump float;
  #define PI 3.1415926538
  varying vec2 vTextureCoord;
  varying vec2 vVertexPosition;
  uniform sampler2D uSampler;
  uniform float progress;

  void main(void) {
    vec2 coord = vVertexPosition * 2.0 - 1.0;

    float rad = atan(coord.y, coord.x);
    if (rad < -PI / 2.0) {
      rad += PI * 2.0;
    }

    float targetRad = -PI / 2.0 + progress * PI * 2.0;
    if (rad < targetRad) {
      discard;
    }

    gl_FragColor = texture2D(uSampler, vTextureCoord);
  }
 `

  sp: Sprite
  filter: Filter
  colors: Color[] = [
    new Color('#00ff00'), // green
    new Color('#ffff00'), // yellow
    new Color('#ff0000'), // red
  ]
  progress = 0
  autoStart = false

  private isStart = false
  private pane: any

  init() {
    // const texture = debugTexture.getChessboardTexture();
    const texture = this.getCircleTexture()

    const sp = new Sprite()
    sp.texture = texture
    sp.anchor.set(0.5)
    pixiEntry.root.addChild(sp)
    this.sp = sp

    const filter = new Filter(this.vs, this.fs, {
      progress: 0,
    })
    sp.filters = [filter]
    this.filter = filter

    this.setProgress(0.7)

    if (this.autoStart) {
      this.startTick()
    }
    this.loadTweakPane()
  }

  tick = () => {
    this.progress += 0.003
    if (this.progress > 1) {
      this.progress = 0
    }
    this.setProgress(this.progress)
  }

  startTick() {
    if (this.isStart) return
    this.isStart = true
    pixiEntry.ticker.add(this.tick)
  }

  stopTick() {
    if (!this.isStart) return
    this.isStart = false
    pixiEntry.ticker.remove(this.tick)
  }

  loadTweakPane() {
    const Tweakpane = win.Tweakpane
    const pane = new Tweakpane.Pane()

    pane
      .addInput({ progress: 0 }, 'progress', {
        min: 0,
        max: 1,
        step: 0.01,
      })
      .on('change', ev => {
        console.log('change', ev.value)
        this.stopTick()
        this.setProgress(ev.value)
      })

    // 添加颜色控制
    const colorFolder = pane.addFolder({ title: 'Colors' })
    this.colors.forEach((color, index) => {
      colorFolder
        .addInput({ color: color.toHex() }, 'color', {
          label: `Color ${index + 1}`,
        })
        .on('change', ev => {
          this.colors[index] = new Color(ev.value)
        })
    })

    // 添加开始/停止按钮控制
    const buttonFolder = pane.addFolder({ title: '动画控制' })
    buttonFolder.addButton({ title: '开始' }).on('click', () => {
      this.startTick()
    })
    buttonFolder.addButton({ title: '停止' }).on('click', () => {
      this.stopTick()
    })
    this.pane = pane
  }

  clear() {
    console.log('clear')
    this.stopTick()
    this.filter.destroy()
    this.filter = null

    this.sp.destroy()
    this.sp = null

    this.pane.dispose()
    this.pane = null
  }

  setProgress(t: number) {
    this.filter.uniforms.progress = t
    this.setColorByProgress(t)
  }

  setColorByProgress(t: number) {
    const len = this.colors.length
    let idx1 = Math.floor(t * len)
    // t取1.0时会越界
    if (idx1 >= len) {
      idx1 = len - 1
    }
    const idx2 = idx1 >= len - 1 ? idx1 : idx1 + 1
    const t1 = idx1 / len
    // 最后的比例需要设置到1.0，因为没有过渡了
    const t2 = idx1 === idx2 ? 1.0 : idx2 / len
    const tColor = (t - t1) / (t2 - t1)
    const color = this.getBlendColor(this.colors[idx1], this.colors[idx2], tColor)

    this.sp.tint = color.toHex()
  }

  getBlendColor(color1: Color, color2: Color, t: number) {
    const arr1 = color1.toArray()
    const arr2 = color2.toArray()
    const r = arr1[0] * (1 - t) + arr2[0] * t
    const g = arr1[1] * (1 - t) + arr2[1] * t
    const b = arr1[2] * (1 - t) + arr2[2] * t
    return new Color([r, g, b])
  }

  getCircleTexture() {
    const size = 256
    const radiusRatio = 0.8
    const radius = size / 2
    const radiusInner = radius * radiusRatio

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    canvas.width = size
    canvas.height = size

    // use for ant put image data
    const imageData = ctx.createImageData(size, size)
    const data = imageData.data
    const centerX = size / 2
    const centerY = size / 2

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - centerX
        const dy = y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        const index = (y * size + x) * 4

        if (distance <= radius && distance >= radiusInner) {
          data[index] = 255
          data[index + 1] = 255
          data[index + 2] = 255
          data[index + 3] = 255
        } else {
          // NOTE：应该不需要处理
          // data[index] = 0;
          // data[index + 1] = 0;
          // data[index + 2] = 0;
          // data[index + 3] = 0;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0)

    const texture = Texture.from(canvas)
    return texture
  }
}

export const timeShaderTest = new TimeShaderTest()
