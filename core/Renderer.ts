import Glass from './Glass';
import Point from './Point';
import Scene from './Scene';

export default class Renderer extends Glass {
  name: string = 'unnamed';
  scene: Scene;

  constructor(public ctx: any) {
    super(ctx.canvas);
    this.scene = new Scene();
    if (!ctx) throw new Error('please check parameter');
  }
  setSize(width: number, height: number) {
    this.wrapElement.style.position = 'absolute';
    this.wrapElement.style.top = 0;
    this.wrapElement.style.left = 0;
    this.setAttrSize(width * window.devicePixelRatio, height * window.devicePixelRatio);
    this.setStyleSize(width, height);
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