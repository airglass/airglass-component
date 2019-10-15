import Glass from './Glass';
import Point from './Point';
import Group from './Group';

export default class Renderer extends Glass {
  name: any;
  scene: Group;

  constructor(public ctx: any) {
    super(ctx.canvas);
    this.scene = new Group();
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