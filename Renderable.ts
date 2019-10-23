export default class Renderable {
  parentRenderable: any;
  userData: object;
  line: number;
  fill: any;
  stroke: any;
  constructor(params?: any) {
    this.line = params && params.line || 1;
    this.fill = params && params.fill || '#fff';
    this.stroke = params && params.stroke || '#111';
    this.userData = {};
  }
  init(){}
  draw(ctx){}
}