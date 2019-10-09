import Glass from './Glass';
import Point from './Point';
import Scene from './Scene';

export default class Renderer extends Glass {
  constructor(public ctx: any, public scene: Scene) {
    super(ctx.canvas);
    if (!ctx || !scene) throw new Error('please check parameter');
  }
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    return this;
  }
  render() {
    for (let child of this.scene.children) {
      child.draw && child.draw(this.ctx);
    }
    return this;
  }
  reRender() {
    this.clear();
    return this.render();
  }
  getElementsContainPoint(point: Point) {
    return this.scene.children.map(el => {
      let inPath = this.ctx.isPointInPath(el.path, point.x, point.y);
      if (inPath) return el;
      return;
    }).filter(el => el);
  }
}