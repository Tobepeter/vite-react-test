class RectTest {
  init() {
    const rect = new PIXI.Graphics();
    rect.beginFill(0xff0000);
    rect.drawRect(0, 0, 100, 100);
    rect.endFill();
    pixiEntry.centerRoot.addChild(rect);
    // pixiEntry.stage.addChild(rect);
  }
}

export const rectTest = new RectTest();
