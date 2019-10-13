import Group from './Group';

export default class RendererManager extends Group {
  constructor(public wrapElement: any) {
    super();
  }
  clearAll() {
    this.children.forEach(renderer => {
      renderer.clear();
    })
  }
  renderAll() {
    this.children.forEach(renderer => {
      renderer.render();
    })
  }
  reRenderAll() {
    this.children.forEach(renderer => {
      renderer.reRender();
    })
  }
  setAllSize(width: number, height: number) {
    this.children.forEach(renderer => {
      renderer.setSize(width, height);
    })
  }
}