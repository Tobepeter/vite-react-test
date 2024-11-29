import { Texture } from 'pixi.js';

class DebugTexture {
  dummyImage = 'https://dummyimage.com/200x200/000/fff';
  dummyImage2 = 'https://dummyimage.com/400x400/fff/000';

  /**
   * 颜色配置
   * @desc 使用string，不使用number是因为canvas 2d API只支持string
   */
  colorMap = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
    yellow: '#ffff00',
    purple: '#ff00ff',
    cyan: '#00ffff',
    white: '#ffffff',
    black: '#000000',
    gray: '#808080',
  } satisfies Record<string, string>;

  chessboard: Texture;

  colorTextureMap = {
    white: null,
    red: null,
    green: null,
    blue: null,
    yellow: null,
    purple: null,
    cyan: null,
    black: null,
    gray: null,
  } satisfies Record<string, Texture>;

  init() {
    this.initTextures();
  }

  getDummyImg(opt?: {
    w?: number;
    h?: number;
    bgColor?: string;
    textColor?: string;
  }) {
    const { w = 200, h = 200, bgColor = 'fff', textColor = '000' } = opt || {};
    return `https://dummyimage.com/${w}x${h}/${bgColor}/${textColor}`;
  }

  getChessboardTexture(gridSize: number = 16, size: number = 256) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    canvas.width = size;
    canvas.height = size;

    for (let x = 0; x < size; x += gridSize) {
      for (let y = 0; y < size; y += gridSize) {
        const isEven = (x / gridSize + y / gridSize) % 2 === 0;
        ctx.fillStyle = isEven ? '#ffffff' : '#cccccc';
        ctx.fillRect(x, y, gridSize, gridSize);
      }
    }

    return Texture.from(canvas);
  }

  getColorTexture(color: string, size: number = 256) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);

    return Texture.from(canvas);
  }

  private initTextures() {
    this.chessboard = this.getChessboardTexture();

    const { colorMap, colorTextureMap } = this;
    const colors = Object.keys(colorMap);

    for (const color of colors) {
      colorTextureMap[color] = this.getColorTexture(colorMap[color]);
    }
  }
}

export const debugTexture = new DebugTexture();
