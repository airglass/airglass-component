import Shape from '../core/Shape';

export default class Avatar extends Shape {
  width: number;
  height: number;
  labelWidth: number;
  labelHeight: number;
  r: number;
  hue: number;

  constructor(opts) {
    super(opts);

    this.width = opts.width || 100;
    this.height = opts.height || 100;
    this.labelWidth = opts.labelWidth || 20;
    this.labelHeight = opts.labelHeight || 10;
    this.r = opts.r || 10;
    this.hue = opts.hue || 0;
  }
  updatePath() {
    let path = new Path2D;
    path.moveTo(this.x, this.y);
    path.lineTo(this.x - this.labelWidth / 2, this.y - this.labelHeight);
    path.lineTo(this.x - this.labelWidth / 2, this.y - this.labelHeight);
    path.lineTo(this.x - this.width / 2 + this.r, this.y - this.labelHeight);
    path.arcTo(
      this.x - this.width / 2, this.y - this.labelHeight,
      this.x - this.width / 2, this.y - this.labelHeight - this.r,
      this.r
    );
    path.lineTo(this.x - this.width / 2, this.y - this.labelHeight - this.height + this.r);
    path.arcTo(
      this.x - this.width / 2, this.y - this.labelHeight - this.height,
      this.x - this.width / 2 + this.r, this.y - this.labelHeight - this.height,
      this.r
    );
    path.lineTo(this.x + this.width / 2 - this.r, this.y - this.labelHeight - this.height);
    path.arcTo(
      this.x + this.width / 2, this.y - this.labelHeight - this.height,
      this.x + this.width / 2, this.y - this.labelHeight - this.height + this.r,
      this.r
    );
    path.lineTo(this.x + this.width / 2, this.y - this.labelHeight - this.r);
    path.arcTo(
      this.x + this.width / 2, this.y - this.labelHeight,
      this.x + this.width / 2 - this.r, this.y - this.labelHeight,
      this.r
    );
    path.lineTo(this.x + this.labelWidth / 2, this.y - this.labelHeight);
    path.closePath();

    let padding = 10;
    let body = [this.x, this.y - this.labelHeight - padding];
    let bodyRadius = this.width * 0.5 - 10;
    let bodyPath = new Path2D;
    bodyPath.arc(body[0], body[1], bodyRadius, 0, Math.PI, true);
    bodyPath.closePath();
    path.addPath(bodyPath);
    
    let headRadius = (this.height - bodyRadius - 2 * padding) / 2;
    let head = [this.x, this.y - this.labelHeight - padding - bodyRadius - headRadius - padding/4];
    let headPath = new Path2D;
    headPath.arc(head[0], head[1], headRadius, 0, Math.PI * 2, true);
    path.addPath(headPath);

    this.path = path;
    return this;
  }
  draw(ctx) {
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.line;
    ctx.fillStyle = `hsla(${this.hue}, 40%, 90%, .7)`;
    ctx.lineJoin = 'round';
    ctx.stroke(this.path);
    ctx.fill(this.path);
  }
}