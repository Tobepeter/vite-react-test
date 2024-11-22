import { Filter, Sprite } from 'pixi.js';
import { debugTexture } from '../util/debug/DebugTexture';

class ShaderTest {
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
    float targetRad = -PI / 2.0 + 0.5 * PI * 2.0;

    targetRad = 0;
    if (rad < targetRad) {
      discard;
    }
    gl_FragColor = texture2D(uSampler, vTextureCoord);
  }
 `;

  init() {
    // const shader = new Shader(this.gl, vertex, fragment);
    const texture = debugTexture.getChessboardTexture();
    const sp = new Sprite(texture);
    sp.anchor.set(0.5);
    const centerRoot = pixiEntry.root;
    centerRoot.addChild(sp);

    const filter = new Filter(undefined, this.fs, {
      progress: 0,
    });
    sp.filters = [filter];
  }
}

export const shaderTest = new ShaderTest();
