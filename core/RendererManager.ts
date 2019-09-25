import Renderer from './Renderer';
import Group from './Group';

export default class RendererManager extends Group {
  canvasWidth: number;
  canvasHeight: number;

  constructor(public wrapEl: any) {
    super();
    this.canvasWidth = 300;
    this.canvasHeight = 150;
  }
  setSize(width: number, height: number) {
    this.canvasWidth = width || this.canvasWidth;
    this.canvasHeight = height || this.canvasHeight;
    this.wrapEl.style.width = `${width}px`;
    this.wrapEl.style.height = `${height}px`;
    this.wrapEl.style.position = `relative`;
    this.wrapEl.style.overflow = `hidden`;
    for (let name in this.children) {
      let renderer: Renderer = this.children[name];
      renderer.ctx.canvas.dataset.name = name;
      renderer.ctx.canvas.width = width * devicePixelRatio;
      renderer.ctx.canvas.height = height * devicePixelRatio;
      renderer.ctx.canvas.style.position = 'absolute';
      renderer.ctx.canvas.style.top = '0';
      renderer.ctx.canvas.style.left = '0';
      renderer.ctx.canvas.style.width = `${width}px`;
      renderer.ctx.canvas.style.height = `${height}px`;
    }
  }
}