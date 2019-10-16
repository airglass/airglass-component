import Renderable from '../core/Renderable';
import Interactable from '../core/Interactable';

class Port extends Interactable {
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
    this.margin = params && params.margin || this.size / 2;
  }
  init() {
    let nameWidth = 200;
    let frameWidth = this.bounds.width = this.line + this.size + nameWidth;
    let frameHeight = frameWidth;
    this.keyframes.updateFrames(frameWidth, frameHeight, this.frameCounts, (i, ctx) => {
      let radius = this.size / 2;
      let path: Path2D = new Path2D;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = this.fill;
      ctx.font = `${this.nameFontSize}px sans-serif`;
      if (this.dir == 'LTR') {
        path.arc(radius, frameHeight / 2, this.size / 2, 0, Math.PI * 2, true);
        ctx.textAlign = 'left';
        ctx.fillText(this.name, this.size + this.margin, frameHeight / 2);
      } else {
        path.arc(frameWidth - radius, frameHeight / 2, radius, 0, Math.PI * 2, true);
        ctx.textAlign = 'right';
        ctx.fillText(this.name, frameWidth - this.size - this.margin, frameHeight / 2);
      }
      ctx.fill(path);
    });
    this.keyframes.initialized = true;
    return this;
  }
  updatePath() {

  }
}

class NodeLine extends Renderable {
  startPoint: any;
  endPoint: any;

  constructor(params?) {
    super(params);
    this.frameCounts = 2;
    this.startPoint = params && params.startPoint || { x: 0, y: 0 };
    this.endPoint = params && params.endPoint || { x: 0, y: 0 };
  }
  init() {
    this.bounds.x = this.startPoint.x > this.endPoint.x ? this.endPoint.x : this.startPoint.x;
    this.bounds.y = this.startPoint.y > this.endPoint.y ? this.endPoint.y : this.startPoint.y;
    let frameWidth = this.bounds.width = Math.ceil(this.line + Math.abs(this.endPoint.x - this.startPoint.x));
    let frameHeight = this.bounds.height = Math.ceil(this.line + Math.abs(this.endPoint.y - this.startPoint.y));
    this.bounds.centerX = this.bounds.x + frameWidth / 2;
    this.bounds.centerY = this.bounds.y + frameHeight / 2;
    this.keyframes.updateFrames(frameWidth, frameHeight, this.frameCounts, (i, ctx) => {
      let margin = this.line / 2;
      let path: Path2D = new Path2D();
      path.moveTo(this.startPoint.x - this.bounds.x + margin, this.startPoint.y - this.bounds.y + margin);
      path.bezierCurveTo(
        this.bounds.centerX - this.bounds.x + margin, this.startPoint.y - this.bounds.y + margin,
        this.bounds.centerX - this.bounds.x + margin, this.endPoint.y - this.bounds.y + margin,
        this.endPoint.x - this.bounds.x + margin, this.endPoint.y - this.bounds.y + margin
      );
      ctx.lineWidth = this.line / 2 + this.line * i / this.frameCounts;
      ctx.strokeStyle = this.stroke;
      ctx.stroke(path);
    });
    this.keyframes.initialized = true;
    return this;
  }
}

export default class Node extends Interactable {
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
  init() {
    let frameWidth = this.bounds.width = this.line + this.width;
    let frameHeight = this.bounds.height = this.line + this.height;
    this.keyframes.updateFrames(frameWidth, frameHeight, this.frameCounts, (i, ctx) => {
      let margin = this.line / 2;

      let path = new Path2D;
      path.moveTo(margin + this.r, margin);
      path.lineTo(margin + this.width - this.r, margin);
      path.arcTo(margin + this.width, margin, margin + this.width, margin + this.r, this.r);
      path.lineTo(margin + this.width, margin + this.height - this.r);
      path.arcTo(margin + this.width, margin + this.height, margin + this.width - this.r, margin + this.height, this.r);
      path.lineTo(margin + this.r, margin + this.height);
      path.arcTo(margin, margin + this.height, margin, margin + this.height - this.r, this.r);
      path.lineTo(margin, margin + this.r);
      path.arcTo(margin, margin, margin + this.r, margin, this.r);
      ctx.strokeStyle = this.stroke;
      ctx.lineWidth = this.line;
      ctx.stroke(path);

      path = new Path2D;
      path.rect(this.line / 2, this.line / 2, this.width, this.nameBarHeight);
      ctx.fillStyle = this.fill;
      ctx.fill(path);

      path = new Path2D;
      path.moveTo(margin, margin + this.nameBarHeight);
      path.lineTo(margin + this.width, margin + this.nameBarHeight);
      ctx.stroke(path);

      ctx.font = `${this.nameFontSize}px sans-serif`;
      ctx.fillStyle = this.nameFill;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(this.name, margin + this.width / 2, margin + this.nameBarHeight / 2);
    });
    this.keyframes.initialized = true;
    return this;
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
    return Math.round(ctx.measureText(this.name).width);
  }
  static createNodeLine(params) {
    return new NodeLine(params);
  }
  static createPort(params?) {
    return new Port(params);
  }
}