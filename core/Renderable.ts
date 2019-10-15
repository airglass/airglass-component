import Keyframes from './Keyframes';

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class Renderable {
  renderX: number;
  renderY: number;
  keyframes: any;
  bounds: Bounds;
  parentRenderable: any;
  constructor(params?: any) {
    this.renderX = params && params.renderX || 0;
    this.renderY = params && params.renderY || 0;
    this.keyframes = new Keyframes();
    this.bounds = {
      x: this.renderX,
      y: this.renderY,
      width: 0,
      height: 0,
    }
  }
  draw(ctx) {
    if (!this.keyframes.initialized) return;
    this.keyframes.drawFrame(ctx, this.renderX, this.renderY);
  }
}