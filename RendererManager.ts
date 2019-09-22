import Renderer from './Renderer';
import Scene from './Scene';

export default class RendererManager {
  renderers: Array<Renderer>;
  canvasWidth: number;
  canvasHeight: number;

  constructor(public wrapEl: any) {
    this.renderers = [];
    this.canvasWidth = 300;
    this.canvasHeight = 150;
  }
  generate() {
    let renderer = new Renderer(
      this.wrapEl.appendChild(document.createElement('canvas')).getContext('2d'),
      new Scene,
    );
    this.renderers.push(renderer);
    return renderer;
  }
  setSize(width: number, height: number) {
    this.canvasWidth = width || this.canvasWidth;
    this.canvasHeight = height || this.canvasHeight;
    this.wrapEl.style.width = `${width}px`;
    this.wrapEl.style.height = `${height}px`;
    this.wrapEl.style.position = `relative`;
    for (let name in this.renderers) {
      let renderer = this.renderers[name];
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