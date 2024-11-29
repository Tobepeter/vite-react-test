import { Texture } from 'pixi.js';
import { debugTexture } from '../util/debug/DebugTexture';
import { ITest } from '../util/ITest';
import { Random } from 'mockjs';
import { debugVisual } from '../util/debug/DebugVisual';

class MemTest implements ITest {
  count = 100;
  sizeArr = [20, 30] as const;
  range = 1000;

  init() {
    const Tweakpane = win.Tweakpane;

    const pane = new Tweakpane.Pane({
      title: '内存测试',
    });

    const params = {
      count: this.count,
      create: () => {
        this.createSprite(params.count);
      },
      remove: () => {
        pixiEntry.root.removeChildren();
      },
    };

    pane.addInput(params, 'count', {
      min: 10,
      max: 1000,
      step: 10,
    });

    pane.addButton({ title: '创建精灵' }).on('click', params.create);
    pane.addButton({ title: '移除所有' }).on('click', params.remove);
  }

  createSprite(count: number) {
    const textures = Object.values(debugTexture.colorTextureMap);
    const range = this.range;
    const rootChildCount = pixiEntry.root.children.length;
    const [size1, size2] = this.sizeArr;
    for (let i = 0; i < count; i++) {
      const sp = goUtil.getSprite(`sp-${rootChildCount + i}`, pixiEntry.root);
      sp.x = Random.float(-range / 2, range / 2);
      sp.y = Random.float(-range / 2, range / 2);
      const size = Random.float(size1, size2);
      sp.width = size;
      sp.height = size;
      sp.anchor.set(0.5);
      sp.texture = Random.pick(textures);
      pixiEntry.root.addChild(sp);
    }
  }
}

export const memTest = new MemTest();

// 禁用hmr
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}
