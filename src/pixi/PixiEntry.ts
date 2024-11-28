import { Application, Color, Container, Ticker, utils } from 'pixi.js';
import { adapt } from './util/Adapt';
import { pixiGlobal } from './util/PixiGlobal';
import { rectTest } from './demo/RectTest';
import { timeShaderTest } from './demo/TimeShaderTest';
import { pixiTest } from './PixiTest';
import { debugHelper } from './util/debug/DebugHelper';
import { debugVisual } from './util/debug/DebugVisual';
import { scriptLoader } from './util/ScriptLoader';
import { debugUtil } from './util/debug/DebugUtil';

class PixiEntry {
  isInited = false;
  app: Application;
  canvas: HTMLCanvasElement;

  stage: Container;

  ticker: Ticker;

  /**
   * 根容器
   * @desc 默认 stage 尺寸是参考css的，这里缩放一下
   * @desc 同时默认居中，方便使用
   */
  root: Container;

  async init() {
    if (this.isInited) return;
    this.isInited = true;

    // TODO: 内部是否支持自动适配？

    const backgroundColor = 0x000000;
    this.app = new Application({
      width: 800,
      height: 600,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      resizeTo: window,
      backgroundColor,

      // NOTE: 貌似不能跑起来canvas模式
      // forceCanvas: true,
    });
    this.canvas = this.app.view as HTMLCanvasElement;
    this.stage = this.app.stage;

    // NOTE: 这个其实是不需要的，但是如果不这么设置，每次hmr都会闪烁一下（默认body是白色的）
    document.body.style.backgroundColor = new Color(backgroundColor).toHex();

    this.root = new Container();
    this.root.name = 'centerRoot';
    this.stage.addChild(this.root);

    this.ticker = new Ticker();
    this.ticker.autoStart = true;

    pixiGlobal.init();

    adapt.init(this.canvas, () => {
      this.onResize();
    });
    this.root.scale.set(1 / adapt.dpr);

    await debugUtil.init();

    this.runTest();
  }

  runTest() {
    pixiTest.init();
  }

  cleanRoot() {
    this.root.removeChildren();

    // NOTE: 不能换引用，test 代码会应用旧的对象
    //  目前内部api没有removeAll，只能手动清除
    this.ticker['_head'].next = null;
  }

  destroy() {
    this.isInited = false;
    adapt.destroy();
    this.cleanRoot();

    this.app.destroy(true, true);
    this.app = null;
    this.canvas = null;
    this.stage = null;
    this.root = null;
  }

  onResize() {
    // console.log('onResize: ', adapt.cssWidth, adapt.cssHeight);

    const width = adapt.cssWidth;
    const height = adapt.cssHeight;
    this.app.renderer.resize(width, height);
    this.root.position.set(width / 2, height / 2);
  }
}

export const pixiEntry = new PixiEntry();

/**
 * 热更新
 *
 * reload是最好的做法
 * 不过为了极致的dev体验，hmr用了destroy
 * 比如修改了application 入参，还是需要destroy重新执行
 */
// if (import.meta.hot) {
//   import.meta.hot.accept(() => {
//     window.location.reload();
//   });
// }
