import Keyframes from './Keyframes';

export default class Renderable {
  renderX: number;
  renderY: number;
  keyframes: any;
  constructor(params: any) {
    this.renderX = params && params.renderX || 0;
    this.renderY = params && params.renderY || 0;
    this.keyframes = new Keyframes();
  }
  draw(ctx) {
    if (!this.keyframes.initialized) return;
    this.keyframes.drawFrame(ctx, this.renderX, this.renderY);
  }
}