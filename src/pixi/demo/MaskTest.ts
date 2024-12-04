import { Sprite } from 'pixi.js';
import { ITest } from '../util/ITest';
import { debugTexture } from '../util/debug/DebugTexture';

class MaskTest implements ITest {
  init() {
    const sp = new Sprite();
    sp.texture = debugTexture.chessboard
    pixiEntry.root.addChild(sp);
    sp.anchor.set(0.5)

    const mask = new Sprite();
    mask.texture = debugTexture.getCircleTexture()
    sp.mask = mask;
    mask.anchor.set(0.5)
    sp.addChild(mask)
  }
}

export const maskTest = new MaskTest();
