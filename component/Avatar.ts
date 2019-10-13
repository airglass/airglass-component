import InteractableShape from '../core/InteractableShape';

export default class Avatar extends InteractableShape {
  size: number;
  labelSize: number;
  r: number;
  hue: number;

  constructor(opts) {
    super(opts);

    this.size = opts.width || 60;
    this.labelSize = opts.labelSize || 8;
    this.r = opts.r || 4;
    this.hue = opts.hue || 0;
  }
  updatePath() {
    let path = new Path2D;
    path.moveTo(this.x, this.y);
    path.lineTo(this.x - this.labelSize, this.y - this.labelSize);
    path.lineTo(this.x - this.labelSize, this.y - this.labelSize);
    path.lineTo(this.x - this.size / 2 + this.r, this.y - this.labelSize);
    path.arcTo(
      this.x - this.size / 2, this.y - this.labelSize,
      this.x - this.size / 2, this.y - this.labelSize - this.r,
      this.r
    );
    path.lineTo(this.x - this.size / 2, this.y - this.labelSize - this.size + this.r);
    path.arcTo(
      this.x - this.size / 2, this.y - this.labelSize - this.size,
      this.x - this.size / 2 + this.r, this.y - this.labelSize - this.size,
      this.r
    );
    path.lineTo(this.x + this.size / 2 - this.r, this.y - this.labelSize - this.size);
    path.arcTo(
      this.x + this.size / 2, this.y - this.labelSize - this.size,
      this.x + this.size / 2, this.y - this.labelSize - this.size + this.r,
      this.r
    );
    path.lineTo(this.x + this.size / 2, this.y - this.labelSize - this.r);
    path.arcTo(
      this.x + this.size / 2, this.y - this.labelSize,
      this.x + this.size / 2 - this.r, this.y - this.labelSize,
      this.r
    );
    path.lineTo(this.x + this.labelSize, this.y - this.labelSize);
    path.closePath();

    let padding = 10;
    let body = [this.x, this.y - this.labelSize - padding];
    let bodyRadius = this.size * 0.5 - 10;
    let bodyPath = new Path2D;
    bodyPath.arc(body[0], body[1], bodyRadius, 0, Math.PI, true);
    bodyPath.closePath();
    path.addPath(bodyPath);

    let headRadius = (this.size - bodyRadius - 2 * padding) / 2;
    let head = [this.x, this.y - this.labelSize - padding - bodyRadius - headRadius - padding / 2];
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