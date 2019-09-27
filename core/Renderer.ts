import Glass from './Glass';
import Point from './Point';
import Scene from './Scene';

export default class Renderer extends Glass {
  constructor(public ctx: any, public scene: Scene) {
    super(ctx.canvas);
    if (!ctx) throw new Error('need CanvasRenderingContext2D');
    if (!scene) throw new Error('need Scene');
  }
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    return this;
  }
  render() {
    this.clear();
    for (let child of this.scene.children) {
      child.draw && child.draw(this.ctx);
    }
    return this;
  }
  getElementsContainPoint(point: Point) {
    return this.scene.children.map(el => {
      let inPath = this.ctx.isPointInPath(el.path, point.x, point.y);
      if (inPath) return el;
      return;
    }).filter(el => el);
  }
}