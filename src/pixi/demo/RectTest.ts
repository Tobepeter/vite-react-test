class RectTest {
  init() {
    const rect = new PIXI.Graphics();
    rect.beginFill(0xff0000);
    const size = 100;
    rect.drawRect(-size / 2, -size / 2, size, size);
    rect.endFill();
    pixiEntry.root.addChild(rect);
    // pixiEntry.stage.addChild(rect);
  }
}

export const rectTest = new RectTest();
