import { ITest } from '../util/ITest';

class MemTest implements ITest {
  init() {
    const Tweakpane = win.TweakPane;

    // button 1 create sprite
    // button 2 remove all sprite

    const pane = new Tweakpane({
      title: '内存测试',
    });

    const params = {
      count: 100,
      create: () => {
        this.createSprite(params.count);
      },
      remove: () => {
        pixiEntry.root.removeChildren();
      },
    };

    pane.addInput(params, 'count', {
      min: 1,
      max: 1000,
      step: 1,
    });
    pane.addButton({ title: '创建精灵' }).on('click', params.create);
    pane.addButton({ title: '移除所有' }).on('click', params.remove);
  }

  createSprite(count: number) {
    for (let i = 0; i < count; i++) {
      const sp = goUtil.getSprite(`sp-${i}`, pixiEntry.root);
      sp.x = Math.random() * 750;
      sp.y = Math.random() * 1334;
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
