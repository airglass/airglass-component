import Rect from './Rect';
import Ellipse from './Ellipse';

export default class Module extends Rect {
  imports: Array<Ellipse>;
  exports: Array<Ellipse>;
  name: string;
  nameFillStyle: string;
  nameFontSize: number;
  r: number;

  constructor(opts: any) {
    super(opts);

    this.imports = opts.imports || [];
    this.exports = opts.exports || [];
    this.name = opts.name || '';
    this.nameFillStyle = opts.nameFillStyle || '#fff';
    this.nameFontSize = opts.nameFontSize || 12;
    this.r = opts.r || 0;
  }
  updatePath() {
    let path: Path2D = new Path2D;
    let r2 = this.r * 2;
    path.moveTo(this.x + this.width / 2, this.y);
    path.lineTo(this.x + this.width - r2, this.y);
    path.bezierCurveTo(
      this.x + this.width - this.r, this.y,
      this.x + this.width, this.y + this.r,
      this.x + this.width, this.y + r2
    );
    path.lineTo(this.x + this.width, this.y + this.height - r2);
    path.bezierCurveTo(
      this.x + this.width, this.y + this.height - this.r,
      this.x + this.width - this.r, this.y + this.height,
      this.x + this.width - r2, this.y + this.height
    );
    path.lineTo(this.x + r2, this.y + this.height);
    path.bezierCurveTo(
      this.x + this.r, this.y + this.height,
      this.x, this.y + this.height - this.r,
      this.x, this.y + this.height - r2,
    );
    path.lineTo(this.x, this.y + r2);
    path.bezierCurveTo(
      this.x, this.y + this.r,
      this.x + this.r, this.y,
      this.x + r2, this.y
    );
    path.closePath();
    this.path = path;
    return this;
  }
  setText(ctx: CanvasRenderingContext2D, text: string) {
    this.name = text;
    ctx.font = `${this.nameFontSize * devicePixelRatio}px 微软雅黑`;
    let measureWidth = ctx.measureText(text).width;
    this.width = parseInt('' + measureWidth);
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) throw new Error('need ctx');

    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke(this.path);
    ctx.fill(this.path);

    ctx.font = `${this.nameFontSize * devicePixelRatio}px 微软雅黑`;
    ctx.fillStyle = this.nameFillStyle;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(this.name, this.x + this.width / 2, this.y + this.height / 2)
  }
}