import { Application, Container } from 'pixi.js';
import { adapt } from './util/Adapt';
import { pixiGlobal } from './util/PixiGlobal';
import { rectTest } from './demo/RectTest';

class PixiEntry {
  isInited = false;
  app: Application;
  canvas: HTMLCanvasElement;

  stage: Container;

  /**
   * 根容器
   * @desc 默认 stage 尺寸是参考css的，这里缩放一下
   * @desc 同时默认居中，方便使用
   */
  root: Container;

  init() {
    if (this.isInited) return;
    this.isInited = true;

    // TODO: 内部是否支持自动适配？
    this.app = new Application({
      width: 800,
      height: 600,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      resizeTo: window,

    });
    this.canvas = this.app.view as HTMLCanvasElement;
    this.stage = this.app.stage;

    pixiGlobal.init();

    this.root = goUtil.getCntr('centerRoot', this.stage);

    adapt.init(this.canvas, () => {
      this.onResize();
    });
    this.root.scale.set(1 / adapt.dpr);

    this.runTest();
  }

  runTest() {
    rectTest.init();
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

if (import.meta.hot) {
  import.meta.hot.accept();
}
