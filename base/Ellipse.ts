import Circle from './Circle';

export default class Ellipse extends Circle {
  width: number;
  height: number;

  constructor(opts: any) {
    super(opts);

    this.width = opts.width || 100;
    this.height = opts.height || 100;
  }
  updatePath() {
    let path: Path2D = new Path2D();
    path.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2, true);
    this.path = path;
  }
}