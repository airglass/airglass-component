import PolyLine from './PolyLine';

export default class Polygon extends PolyLine {
  constructor(opts: any) {
    super(opts);
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!this.path) return;
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.line;
    ctx.stroke(this.path);
    ctx.fill(this.path);
  }
}