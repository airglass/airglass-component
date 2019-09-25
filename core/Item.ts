import Shape from '../shape/Shape';

export default class Item extends Shape {
  name: string;
  dir: string;
  nameFontSize: number;
  margin: number;
  style: string;
  size: number;

  constructor(opts) {
    super(opts);
    this.name = opts.name || '';
    this.dir = opts.dir || 'LTR';
    this.nameFontSize = opts.nameFontSize || 12;
    this.size = opts.size || 10;
    this.margin = opts.margin || this.size * 1.5;
    this.style = opts.style || 'ellipse';
  }
  updatePath() {
    let path: Path2D = new Path2D();
    if (this.style == 'ellipse') {
      path.ellipse(this.x, this.y, this.size / 2, this.size / 2, 0, 0, Math.PI * 2, true);
    }
    if(this.style == 'rect'){
      path.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
    this.path = path;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) throw new Error('need ctx');
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke(this.path);
    ctx.fillStyle = this.fill;
    ctx.fill(this.path);

    ctx.textBaseline = 'middle';
    ctx.font = `${this.nameFontSize}px sans-serif`;
    if (this.dir == 'LTR') {
      ctx.textAlign = 'left';
      ctx.fillText(this.name, this.x + this.margin, this.y);
    } else {
      ctx.textAlign = 'right';
      ctx.fillText(this.name, this.x - this.margin, this.y);
    }
  }
}