import Rect from '../base/Rect';
import Point from '../core/Point';
import Line from '../core/Line';
import Shape from '../core/Shape';

class Port extends Shape {
  name: string;
  dir: string;
  nameFontSize: number;
  margin: number;
  size: number;

  constructor(opts) {
    super(opts);
    this.name = opts.name || '';
    this.dir = opts.dir || 'LTR';
    this.nameFontSize = opts.nameFontSize || 12;
    this.size = opts.size || 10;
    this.margin = opts.margin || this.size * 1.5;
  }
  updatePath() {
    let path: Path2D = new Path2D();
    path.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2, true);
    this.path = path;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) throw new Error('need ctx');
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.line;
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

class NodeLine extends Line {
  lightWidth: number = 20;
  lineLength: number = 0;
  currentT: number;
  boundWidth: number = 0;
  boundHeight: number = 0;
  tSpeed: number = 0;

  constructor(public startPoint: Point = new Point(0, 0), public endPoint: Point = new Point(0, 0)) {
    super(startPoint, endPoint);
    this.currentT = 0;
    this.updateBound();
  }
  updatePath() {
    let center: Point = {
      x: this.startPoint.x + (this.endPoint.x - this.startPoint.x) / 2,
      y: this.startPoint.y + (this.endPoint.y - this.startPoint.y) / 2,
    }
    let c1: Point = {
      x: center.x,
      y: this.startPoint.y
    }
    let c2: Point = {
      x: center.x,
      y: this.endPoint.y
    }
    let path: Path2D = new Path2D();
    path.moveTo(this.startPoint.x, this.startPoint.y);
    path.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, this.endPoint.x, this.endPoint.y);
    this.path = path;
  }
  updateBound() {
    this.boundWidth = this.endPoint.x - this.startPoint.x;
    this.boundHeight = this.endPoint.y - this.startPoint.y;
    this.lineLength = Math.ceil(Math.sqrt(Math.pow(this.boundWidth, 2) + Math.pow(this.boundHeight, 2)));
    this.tSpeed = 5 / this.lineLength;
  }
  updateLight() {
    this.currentT += this.tSpeed;
    if (this.currentT > 1) this.currentT = 0;
    let x = this.startPoint.x + this.boundWidth * this.currentT;
    let y = this.startPoint.y + this.currentT * this.boundHeight;
    return {
      p1: new Point(x - this.boundWidth * .1, y - this.boundHeight * .1),
      center: new Point(x, y),
      p2: new Point(x + this.boundWidth * .1, y + this.boundHeight * .1),
    };
  }
}

export default class Node extends Rect {
  imports: Array<Port>;
  exports: Array<Port>;
  name: string;
  nameFill: string;
  nameFontSize: number;
  r: number;
  nameBarHeight: number;

  constructor(opts: any) {
    super(opts);

    this.imports = opts.imports || [];
    this.exports = opts.exports || [];
    this.name = opts.name || '';
    this.nameFill = opts.nameFill || '#fff';
    this.nameFontSize = opts.nameFontSize || 12;
    this.r = opts.r || 0;
    this.nameBarHeight = opts.nameBarHeight || 40;
  }
  static createNodeLine(startPoint, endPoint){
    return new NodeLine(startPoint, endPoint);
  }
  static createPort(opts) {
    return new Port(opts);
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
  getTextWidth(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.nameFontSize}px sans-serif`;
    let measureWidth = ctx.measureText(this.name).width;
    return parseInt('' + measureWidth);
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) throw new Error('need ctx');

    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.line;
    ctx.stroke(this.path);


    let path = new Path2D;
    path.rect(this.x, this.y, this.width, this.nameBarHeight);
    ctx.fillStyle = this.fill;
    ctx.fill(path);

    path = new Path2D;
    path.moveTo(this.x, this.y + this.nameBarHeight);
    path.lineTo(this.x + this.width, this.y + this.nameBarHeight);
    ctx.stroke(path);

    ctx.font = `${this.nameFontSize}px sans-serif`;
    ctx.fillStyle = this.nameFill;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(this.name, this.x + this.width / 2, this.y + this.nameBarHeight / 2);
  }
}