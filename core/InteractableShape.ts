import Interactable from './Interactable';

export default class InteractableShape extends Interactable {
  x: number;
  y: number;
  fill: any;
  line: number;
  stroke: any;

  constructor(params: any) {
    super(params);
    this.set(params);

    this.x = params.x || 0;
    this.y = params.y || 0;
    this.fill = params.fill || '#fff';
    this.stroke = params.stroke || '#000';
    this.line = (params.line || 1) * devicePixelRatio;
  }
  set(params: any) {
    if (!params) return;
    for (let paramName in params) {
      this[paramName] = params[paramName];
    }
  }
}