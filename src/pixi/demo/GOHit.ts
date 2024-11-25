import { Graphics } from 'pixi.js';

/**
 * 显示对象点击测试
 *
 * 1. container自身设置宽度无法监听
 * 2. sprite可以直接设置宽高来监听
 * 3. graphics设置宽高无效
 * 4. graphics设置fill可以监听，即使是alpha为0
 */
class GOHit {
  init() {
    // this.test_cntr();
    // this.test_sp();
    // this.test_ghc();
    this.test_ghc_fill();
  }

  private test_cntr() {
    const cntr = goUtil.getCntr('hit-cntr', pixiEntry.stage);
    cntr.width = 100;
    cntr.height = 100;
    cntr.eventMode = 'static';
    cntr.on('pointerdown', () => {
      console.log('cntr pointerdown');
    });
  }

  private test_sp() {
    const sp = goUtil.getSprite('hit-sp', pixiEntry.stage);
    sp.width = 100;
    sp.height = 100;
    sp.eventMode = 'static';
    sp.on('pointerdown', () => {
      console.log('sp pointerdown');
    });
  }

  private test_ghc() {
    const ghc = new Graphics();
    pixiEntry.stage.addChild(ghc);
    ghc.width = 100;
    ghc.height = 100;
    ghc.eventMode = 'static';
    ghc.on('pointerdown', () => {
      console.log('ghc pointerdown');
    });
  }

  private test_ghc_fill() {
    const ghc = new Graphics();
    pixiEntry.stage.addChild(ghc);
    ghc.beginFill(0xff0000, 0.5);
    ghc.drawRect(0, 0, 100, 100);
    ghc.alpha = 0;
    ghc.endFill();
    ghc.eventMode = 'static';
    ghc.on('pointerdown', () => {
      console.log('ghc pointerdown');
    });
  }
}

export const goHit = new GOHit();
