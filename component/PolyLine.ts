import Shape from '../core/Shape';
import Point from '../core/Point';
import min from '../utils/min';
import max from '../utils/max';

export default class PolyLine extends Shape {
  points: Array<Point>;
  width: number | undefined;
  height: number | undefined;
  minX: number | undefined;
  minY: number | undefined;
  maxX: number | undefined;
  maxY: number | undefined;

  constructor(opts: any) {
    super(opts);

    this.points = opts.points || [];
  }
  addPoint(point: Point) {
    this.points.push(point);
    this.updatePath();
  }
  updatePath() {
    if (!this.points || this.points.length == 0) return;
    let path: Path2D = new Path2D();
    for (let i = 0; i < this.points.length; i++) {
      let point: Point = this.points[i];
      if (i == 0) {
        path.moveTo(point.x, point.y);
        continue;
      }
      path.lineTo(point.x, point.y);
    }
    this.path = path;

    let x: Array<number> = [];
    let y: Array<number> = [];
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      x.push(point.x);
      y.push(point.y);
    }
    this.minX = min(x);
    this.minY = min(y);
    this.maxX = max(x);
    this.maxY = max(y);
    this.width = this.maxX - this.minX;
    this.height = this.maxY - this.minY;
    this.x = this.minX + this.width / 2;
    this.y = this.minY + this.height / 2;
    return this;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!this.path) return;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.line;
    ctx.stroke(this.path);
  }
}