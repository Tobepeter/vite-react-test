import { Color, Filter, Sprite, Texture } from 'pixi.js'
import { ITest } from '../util/ITest'

/**
 * 从下往上的扫光溶解效果
 */
class SweepResolveEffect implements ITest {
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
    }
  `

  fs = /** glsl */ `
    precision mediump float;
    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform vec4 inputPixel;
    uniform float chunkSize;
    uniform float progress;

    vec3 getRandomColorByHue(float random) {
      float hue = random;  // 随机色相
      vec3 hsv = vec3(hue, 0.5, 1.0); // 固定较高的饱和度和亮度
      vec3 rgb = clamp(abs(mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
      rgb = rgb * rgb * (3.0 - 2.0 * rgb); // 更平滑的过渡
      vec3 rgbColor = mix(vec3(1.0), rgb, 0.8); // 混合一些白色使其更亮
      return rgbColor;
    }

    void main(void) {
      // 当前横向chunk索引
      float chunkIndex = floor(vTextureCoord.x * inputPixel.x / chunkSize);
      const float randomMin = 0.5;
      float random = fract(sin(chunkIndex * 12.9898) * 43758.5453);
      float progressRandom = randomMin + (1.0 - randomMin) * random;

      // 映射进度，较低的随机值更快完成
      float chunkProgress = progress / progressRandom;

      if (1.0 - vTextureCoord.y > chunkProgress) {
        discard;
      }

      vec4 mainColor = texture2D(uSampler, vTextureCoord);
      if (mainColor.a < 0.1) {
        discard;
      }

      // -- 在下方一定chunk距离增加边缘色 --
      // vec4 edgeColor = vec4(1.0, 0.46, 0.9, 1.0);

      vec4 edgeColor = vec4(getRandomColorByHue(random), 1.0);

      const float edgeSize = 32.0;
      float edgeSizeNorm = edgeSize / inputPixel.y;
      float minEdgeY = chunkProgress - edgeSizeNorm;
      float edgeProgress = (1.0 - vTextureCoord.y - minEdgeY) / (chunkProgress - minEdgeY);
      edgeProgress = clamp(edgeProgress, 0.0, 1.0);

      // 防止亮度过大
      float maxEdgeProgress = 0.5;
      edgeProgress = edgeProgress * maxEdgeProgress;

      edgeProgress = pow(edgeProgress, 0.5);

      // vec4 finalColor = mainColor + edgeColor * edgeProgress;
      vec4 finalColor = mix(mainColor, edgeColor, edgeProgress);

      gl_FragColor = finalColor;
    }
  `

  chunkSize = 4
  sp: Sprite
  progress = 0
  filter: Filter

  init() {
    this.initSprite()
    this.initFilter()
  }

  initSprite() {
    const sp = new Sprite(this.getCircleChessboardTexture())
    sp.anchor.set(0.5)
    pixiEntry.root.addChild(sp)
    this.sp = sp
  }

  initFilter() {
    const filter = new Filter(this.vs, this.fs, {
      chunkSize: this.chunkSize,
      progress: 0,
    })
    this.filter = filter
    this.sp.filters = [filter]
  }

  chunkInfo: Array<{
    curHeight: number
    speed: number
  }> = []

  update(delta: number) {
    this.progress += delta * 0.01
    if (this.progress > 1) {
      this.progress = 0
    }
    this.updateByProgress()
  }

  setProgress(t: number) {
    this.progress = t
    this.updateByProgress()
  }

  updateByProgress() {
    this.filter.uniforms.progress = this.progress
  }

  getCircleChessboardTexture() {
    const size = 256
    const radis = size / 2
    const gridSize = 32
    const color1 = 0x777777
    const color2 = 0xffffff

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = size
    canvas.height = size

    const color1Arr = new Color(color1).toUint8RgbArray()
    const color2Arr = new Color(color2).toUint8RgbArray()

    const imageData = ctx.createImageData(size, size)
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const xdis = x - radis
        const ydis = y - radis
        const distance = Math.sqrt(xdis * xdis + ydis * ydis)
        if (distance > radis) continue

        const index = (y * size + x) * 4
        const gridCol = Math.floor(x / gridSize)
        const gridRow = Math.floor(y / gridSize)
        const color = (gridCol + gridRow) % 2 === 0 ? color1Arr : color2Arr
        imageData.data[index] = color[0]
        imageData.data[index + 1] = color[1]
        imageData.data[index + 2] = color[2]
        imageData.data[index + 3] = 255
      }
    }

    ctx.putImageData(imageData, 0, 0)

    const texture = Texture.from(canvas)
    return texture
  }
}

export const sweepResolveEffect = new SweepResolveEffect()
