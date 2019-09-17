import Ellipse from './Ellipse';

export default class Item extends Ellipse {
  name: string;
  dir: string;
  nameFontSize: number;
  margin: number;

  constructor(opts) {
    super(opts);
    this.name = opts.name || '';
    this.dir = opts.dir || 'LTR';
    this.nameFontSize = opts.nameFontSize || 12;
    this.margin = opts.margin || this.width;
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