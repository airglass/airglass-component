import Glass from './Glass';
import Group from './Group';

export default class Renderer extends Glass {
  name: any;
  scene: Group;

  constructor(params) {
    super(params);
    this.scene = new Group();
  }
  setSize(width: number, height: number) {
    this.element.style.position = 'absolute';
    this.element.style.top = 0;
    this.element.style.left = 0;
    this.setAttrSize(width * this.DPR, height * this.DPR);
    this.setStyleSize(width, height);
  }
  clear() {
    let ctx = this.element.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    return this;
  }
  render() {
    let ctx = this.element.getContext('2d');
    for (let child of this.scene.children) {
      child.draw && child.draw(ctx);
    }
    return this;
  }
  reRender() {
    this.clear();
    return this.render();
  }
  getElementsContainPoint(point) {
    let ctx = this.element.getContext('2d');
    return this.scene.children.map(el => {
      let inPath = ctx.isPointInPath(el.path, point.x, point.y);
      if (inPath) return el;
      return;
    }).filter(el => el);
  }
}