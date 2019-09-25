import Shape from './Shape';

export default class Ellipse extends Shape {
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
  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) throw new Error('need ctx');
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke(this.path);
    ctx.fillStyle = this.fill;
    ctx.fill(this.path);
  }
}