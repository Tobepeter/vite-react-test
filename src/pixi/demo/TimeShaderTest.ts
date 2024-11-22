import { Filter, Sprite } from 'pixi.js';
import { debugTexture } from '../util/debug/DebugTexture';

class TimeShaderTest {
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
  `;

  fs = /** glsl */ `
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
 `;

  init() {
    const texture = debugTexture.getChessboardTexture();
    const sp = new Sprite();
    sp.texture = texture;
    sp.anchor.set(0.5);
    const centerRoot = pixiEntry.root;
    centerRoot.addChild(sp);

    const filter = new Filter(this.vs, this.fs, {
      progress: 0,
    });
    sp.filters = [filter];

    let progress = 0;
    pixiEntry.ticker.add(() => {
      progress += 0.003;
      if (progress > 1) {
        progress = 0;
      }
      filter.uniforms.progress = progress;
    });
  }
}

export const shaderTest = new TimeShaderTest();
