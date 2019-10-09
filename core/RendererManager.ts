import Renderer from './Renderer';
import Group from './Group';

export default class RendererManager extends Group {
  canvasWidth: number;
  canvasHeight: number;
  dpr: number;
  width: number;
  height: number;

  constructor(public glass: any) {
    super();
    this.canvasWidth = 300;
    this.canvasHeight = 150;
    this.dpr = window.devicePixelRatio;
    this.width = this.canvasWidth * this.dpr;
    this.height = this.canvasHeight * this.dpr;
  }
  clearAll(){
    this.children.forEach(renderer => {
      renderer.clear();
    })
  }
  renderAll(){
    this.children.forEach(renderer => {
      renderer.render();
    })
  }
  setSize(width: number, height: number) {
    this.canvasWidth = width || this.canvasWidth;
    this.canvasHeight = height || this.canvasHeight;
    this.width = this.canvasWidth * this.dpr;
    this.height = this.canvasHeight * this.dpr;
    this.glass.style.width = `${this.canvasWidth}px`;
    this.glass.style.height = `${this.canvasHeight}px`;
    this.glass.style.position = `relative`;
    this.glass.style.overflow = `hidden`;
    for (let i in this.children) {
      let renderer: Renderer = this.children[i];
      renderer.ctx.canvas.width = this.width;
      renderer.ctx.canvas.height = this.height;
      renderer.ctx.canvas.style.position = 'absolute';
      renderer.ctx.canvas.style.top = '0';
      renderer.ctx.canvas.style.left = '0';
      renderer.ctx.canvas.style.width = `${this.canvasWidth}px`;
      renderer.ctx.canvas.style.height = `${this.canvasHeight}px`;
    }
  }
}