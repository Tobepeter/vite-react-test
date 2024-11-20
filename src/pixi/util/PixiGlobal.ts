import { pixiEntry } from '../PixiEntry';
import * as PIXI from 'pixi.js';
import { goUtil } from './GOUtil';

/**
 * 使用默认导入导入 PIXI
 *
 * 目前貌似还不能使用，虽然 tsconfig 配置了
 * esModuleInterop 和 allowSyntheticDefaultImports
 */
class PixiGlobal {
  init() {
    this.injectUnplugin();
    this.injectPixi();
  }

  private injectUnplugin() {
    win.pixiEntry = pixiEntry;
    win.PIXI = PIXI;

    win.goUtil = goUtil;
  }

  private injectPixi() {
    win.stage = pixiEntry.stage;
    win.app = pixiEntry.app;
    win.canvas = pixiEntry.canvas;
    win.renderer = pixiEntry.app.renderer;
  }
}

export const pixiGlobal = new PixiGlobal();

declare global {
  const pixiEntry: typeof import('../PixiEntry').pixiEntry;
  const PIXI: typeof import('pixi.js');
  const goUtil: typeof import('./GOUtil').goUtil;
}
