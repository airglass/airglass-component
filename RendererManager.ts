import Group from './Group';
import Renderer from './Renderer';

export default class RendererManager extends Group {
  constructor() {
    super();
  }
  setSize(width: number = 300, height: number = 150) {
    for (let name in this.children) {
      let renderer = this.children[name];
      renderer.ctx.canvas.dataset.name = name;
      renderer.ctx.canvas.width = width * devicePixelRatio;
      renderer.ctx.canvas.height = height * devicePixelRatio;
      renderer.ctx.canvas.style = `position:absolute;top:0;left:0;width:${width}px;height:${height}px;`;
    }
  }
}