import { Texture } from 'pixi.js';

class DebugTexture {
  dummyImage = 'https://dummyimage.com/200x200/000/fff';
  dummyImage2 = 'https://dummyimage.com/400x400/fff/000';

  colorMap = {
    red: 0xff0000,
    green: 0x00ff00,
    blue: 0x0000ff,
    yellow: 0xffff00,
    purple: 0xff00ff,
    cyan: 0x00ffff,
    white: 0xffffff,
    black: 0x000000,
    gray: 0x808080,
  } satisfies Record<string, number>;

  textureMap = {
    chessboard: null,

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
    this.initTextureMap();
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

  private initTextureMap() {
    const map = this.textureMap;
    map.chessboard = this.getChessboardTexture();
    map.white = this.getColorTexture('#ffffff');
    map.red = this.getColorTexture('#ff0000');
    map.green = this.getColorTexture('#00ff00');
    map.blue = this.getColorTexture('#0000ff');
    map.yellow = this.getColorTexture('#ffff00');
    map.purple = this.getColorTexture('#ff00ff');
    map.cyan = this.getColorTexture('#00ffff');
    map.black = this.getColorTexture('#000000');
    map.gray = this.getColorTexture('#808080');
  }
}

export const debugTexture = new DebugTexture();
