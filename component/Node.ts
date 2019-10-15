import Point from '../core/Point';
import InteractableShape from '../core/InteractableShape';
import Renderable from '../core/Renderable';

class Port extends InteractableShape {
  name: string;
  dir: string;
  nameFontSize: number;
  margin: number;
  size: number;

  constructor(params?) {
    super(params);
    this.name = params && params.name || '';
    this.dir = params && params.dir || 'LTR';
    this.nameFontSize = params && params.nameFontSize || 12;
    this.size = params && params.size || 10;
    this.margin = params && params.margin || this.size * 1.5;
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

class NodeLine extends Renderable {
  lightWidth: number = 20;
  lineLength: number = 0;
  currentT: number;
  boundWidth: number = 0;
  boundHeight: number = 0;
  tSpeed: number = 0;

  constructor(public startPoint: Point = new Point(0, 0), public endPoint: Point = new Point(0, 0)) {
    super();
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

export default class Node extends InteractableShape {
  imports: Array<Port>;
  exports: Array<Port>;
  name: string;
  nameFill: string;
  nameFontSize: number;
  r: number;
  nameBarHeight: number;
  width: number;
  height: number;
  constructor(params?: any) {
    super(params);

    this.width = 0;
    this.height = 0;
    this.imports = params && params.imports || [];
    this.exports = params && params.exports || [];
    this.name = params && params.name || '';
    this.nameFill = params && params.nameFill || '#fff';
    this.nameFontSize = params && params.nameFontSize || 12;
    this.r = (params && params.r || 2) * devicePixelRatio;
    this.nameBarHeight = params && params.nameBarHeight || 40;
  }
  static createNodeLine(startPoint, endPoint) {
    return new NodeLine(startPoint, endPoint);
  }
  static createPort(params?) {
    return new Port(params);
  }
  updatePath() {
    let path: Path2D = new Path2D;
    path.moveTo(this.x + this.r, this.y);
    path.lineTo(this.x + this.width - this.r, this.y);
    path.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.r, this.r);
    path.lineTo(this.x + this.width, this.y + this.height - this.r);
    path.arcTo(this.x + this.width, this.y + this.height, this.x + this.width - this.r, this.y + this.height, this.r);
    path.lineTo(this.x + this.r, this.y + this.height);
    path.arcTo(this.x, this.y + this.height, this.x, this.y + this.height - this.r, this.r);
    path.lineTo(this.x, this.y + this.r);
    path.arcTo(this.x, this.y, this.x + this.r, this.y, this.r);
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