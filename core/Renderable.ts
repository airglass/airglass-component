import Keyframes from './Keyframes';

export interface Bounds {
  x: number;
  y: number;
  centerX: number,
  centerY: number,
  width: number;
  height: number;
}

export default class Renderable {
  keyframes: any;
  bounds: Bounds;
  frameCounts: number;
  parentRenderable: any;
  userData: object;
  line: number;
  fill: any;
  stroke: any;
  constructor(params?: any) {
    this.line = (params && params.line || 1) * devicePixelRatio;
    this.fill = params && params.fill || 0xffffff;
    this.stroke = params && params.stroke || 0xffffff;
    this.frameCounts = params && params.frameCounts || 1;
    
    this.userData = {};
    this.keyframes = new Keyframes();
    this.bounds = {
      x: 0,
      y: 0,
      centerX: 0,
      centerY: 0,
      width: 0,
      height: 0,
    }
  }
  init(){}
  locate(x, y, p = 0) {
    this.bounds.width = this.keyframes.frameWidth;
    this.bounds.height = this.keyframes.frameHeight;
    switch (p) {
      case 0:
        this.bounds.x = x - this.bounds.width / 2;
        this.bounds.y = y - this.bounds.height / 2;
        break;
      case 1:
        this.bounds.x = x;
        this.bounds.y = y;
        break;
      case 2:
        this.bounds.x = x - this.bounds.width/2;
        this.bounds.y = y;
        break;
      case 3:
        this.bounds.x = x - this.bounds.width;
        this.bounds.y = y;
        break;
      case 4:
        this.bounds.x = x - this.bounds.width;
        this.bounds.y = y - this.bounds.height / 2;
        break;
      case 5:
        this.bounds.x = x - this.bounds.width;
        this.bounds.y = y - this.bounds.height;
        break;
      case 6:
        this.bounds.x = x - this.bounds.width / 2;
        this.bounds.y = y - this.bounds.height;
        break;
      case 7:
        this.bounds.x = x;
        this.bounds.y = y - this.bounds.height;
        break;
      case 8:
        this.bounds.x = x;
        this.bounds.y = y - this.bounds.height / 2;
        break;
    }
  }
  draw(ctx) {
    if (!this.keyframes.initialized) return;
    this.keyframes.drawFrame(ctx, this.bounds.x, this.bounds.y);
  }
}