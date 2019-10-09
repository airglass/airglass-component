import Element from './Element';

export default class Shape extends Element {
  x: number;
  y: number;
  fill: any;
  stroke: any;
  line: number;

  constructor(opts: any) {
    super(opts);

    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.fill = opts.fill || '#eee';
    this.stroke = opts.stroke || '#111';
    this.line = opts.line * devicePixelRatio || devicePixelRatio;
  }
}