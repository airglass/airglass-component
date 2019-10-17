import Renderable from "./Renderable";
import Keyframes from "./Keyframes";

export interface Bounds {
  x: number;
  y: number;
  centerX: number,
  centerY: number,
  width: number;
  height: number;
}

export default class Effect extends Renderable {
  keyframes: any;
  frameCounts: number;
  bounds: Bounds;
  constructor(params?){
    super(params);
    this.keyframes = new Keyframes();
    this.frameCounts = params && params.frameCounts || 1;
    this.bounds = {
      x: 0,
      y: 0,
      centerX: 0,
      centerY: 0,
      width: 0,
      height: 0,
    }
  }
  locate(x, y, p = 0) {
    this.bounds.width = this.keyframes.frameWidth;
    this.bounds.height = this.keyframes.frameHeight;
    let halfBoundWidth = this.bounds.width / 2;
    let halfBoundHeight = this.bounds.height / 2;
    switch (p) {
      case 0:
        this.bounds.x = x - halfBoundWidth;
        this.bounds.y = y - halfBoundHeight;
        break;
      case 1:
        this.bounds.x = x;
        this.bounds.y = y;
        break;
      case 2:
        this.bounds.x = x - halfBoundWidth;
        this.bounds.y = y;
        break;
      case 3:
        this.bounds.x = x - this.bounds.width;
        this.bounds.y = y;
        break;
      case 4:
        this.bounds.x = x - this.bounds.width;
        this.bounds.y = y - halfBoundHeight;
        break;
      case 5:
        this.bounds.x = x - this.bounds.width;
        this.bounds.y = y - this.bounds.height;
        break;
      case 6:
        this.bounds.x = x - halfBoundWidth;
        this.bounds.y = y - this.bounds.height;
        break;
      case 7:
        this.bounds.x = x;
        this.bounds.y = y - this.bounds.height;
        break;
      case 8:
        this.bounds.x = x;
        this.bounds.y = y - halfBoundHeight;
        break;
    }
  }
  draw(ctx) {
    if (!this.keyframes.initialized) return;
    this.keyframes.drawFrame(ctx, this.bounds.x, this.bounds.y);
  }
}