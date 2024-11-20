
class Adapt {

  dpr = 1
  width = 0
  height = 0
  cssWidth = 0
  cssHeight = 0

  canvas: HTMLCanvasElement;

  resizeTimer = -1
  resizeThrottleTime = 100;
  lastResizeTime = 0;

  cb?: () => void;

  init(canvas: HTMLCanvasElement, cb?: () => void) {
    this.canvas = canvas;
    this.cb = cb;

    window.addEventListener("resize", () => {
      this.throttleResize();
    });
    this.throttleResize();

    this.adjustCss();
  }

  /**
   * 移除默认浏览器的 margin 8px
   */
  adjustCss() {
    document.body.style.margin = '0';
  }

  stopThrottleResize() {
    if (this.resizeTimer > -1) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = -1;
    }
  }

  throttleResize() {
    const now = Date.now();

    // 没有定时器，且上一次resize比较久远了，可以直接触发
    if (this.resizeThrottleTime == -1) {
      if (now - this.lastResizeTime > this.resizeThrottleTime) {
        this.onResize();
        this.lastResizeTime = now;
        return;
      }
    } else {
      this.stopThrottleResize();
    }

    this.resizeTimer = setTimeout(() => {
      this.onResize();
      this.lastResizeTime = now;
      this.resizeTimer = -1;
    }, this.resizeThrottleTime);
  }

  onResize() {
    this.dpr = window.devicePixelRatio;
    const innerWidth = window.innerWidth || document.documentElement.clientWidth;
    const innerHeight = window.innerHeight || document.documentElement.clientHeight;
    this.width = innerWidth * this.dpr;
    this.height = innerHeight * this.dpr;
    this.cssWidth = innerWidth;
    this.cssHeight = innerHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = `${this.cssWidth}px`;
    this.canvas.style.height = `${this.cssHeight}px`;

    this.cb?.();
  }

}

export const adapt = new Adapt();
