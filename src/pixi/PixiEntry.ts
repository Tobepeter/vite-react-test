import { Application, Container } from 'pixi.js';
import { adapt } from './util/Adapt';
import { pixiGlobal } from './util/PixiGlobal';
import { rectTest } from './demo/RectTest';

class PixiEntry {
  isInited = false;
  app: Application;
  canvas: HTMLCanvasElement;

  stage: Container;
  centerRoot: Container;

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

    this.centerRoot = goUtil.getCntr('centerRoot', this.stage)
    adapt.init(this.canvas, () => {
      this.onResize();
    });
    this.runTest();
  }

  runTest() {
    rectTest.init();
  }

  onResize() {
    console.log('onResize: ', adapt.cssWidth, adapt.cssHeight);

    // TODO: 适配方案是不是很明确
    this.app.renderer.resize(adapt.cssWidth, adapt.cssHeight);

    // this.centerRoot.position.set(adapt.width / 2, adapt.height / 2);
    this.centerRoot.position.set(800, 50);
  }
}

export const pixiEntry = new PixiEntry();

if (import.meta.hot) {
  import.meta.hot.accept();
}
