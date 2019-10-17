export default class Renderable {
  parentRenderable: any;
  userData: object;
  line: number;
  fill: any;
  stroke: any;
  constructor(params?: any) {
    this.line = params && params.line || 1;
    this.fill = params && params.fill || 0xffffff;
    this.stroke = params && params.stroke || 0xffffff;
    this.userData = {};
  }
  init(){}
  draw(ctx){}
}