import Rect from './Rect';
import Ellipse from './Ellipse';

export default class Module extends Rect {
  imports: Array<Ellipse> = [];
  exports: Array<Ellipse> = [];
  name: string = '';
  textStyle: string = '#fff';
  fontSize: number = 12;
  r: number = 0;

  constructor(opts: any) {
    super(opts);
  }
  updatePath() {
    let path: Path2D = new Path2D();
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
    ctx.font = `${this.fontSize * devicePixelRatio}px 微软雅黑`;
    let measureWidth = ctx.measureText(text).width;
    this.width = parseInt('' + measureWidth);
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) throw new Error('need ctx');

    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke(this.path);
    ctx.fill(this.path);

    ctx.font = `${this.fontSize * devicePixelRatio}px 微软雅黑`;
    ctx.fillStyle = this.strokeStyle;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(this.name, this.x + this.width / 2, this.y + this.height / 2)
  }
}