import Point from '../core/Point';
import min from '../utils/min';
import max from '../utils/max';
import Renderable from '../core/Renderable';

export default class PolyLine extends Renderable {
  points: Array<Point>;
  stroke: any;
  line: number;

  constructor(params?) {
    super(params);
    this.points = params && params.points || [];
    this.stroke = params && params.stroke || 0xffffff;
    this.line = (params && params.line || 1) * devicePixelRatio;
    this._init();
  }
  _init() {
    if (this.points.length == 0) return;
    let allX: Array<number> = [];
    let allY: Array<number> = [];
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      allX.push(Math.round(point.x));
      allY.push(Math.round(point.y));
    }
    let minX = this.bounds.x = min(allX);
    let minY = this.bounds.y = min(allY);
    let maxX = max(allX);
    let maxY = max(allY);
    let frameWidth = maxX - minX;
    let frameHeight = maxY - minY;

    frameWidth += this.line;
    frameHeight += this.line;

    this.keyframes.updateFrames(frameWidth, frameHeight, this.frameCounts, (frameIndex, ctx) => {
      let path: Path2D = new Path2D;
      let halfLine = this.line / 2;
      for (let i = 0; i < this.points.length; i++) {
        let point: Point = this.points[i];
        let x = point.x - minX + halfLine;
        let y = point.y - minY + halfLine;
        if (i == 0) {
          path.moveTo(x, y);
          continue;
        }
        path.lineTo(x, y);
      }
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = this.line;
      ctx.strokeStyle = this.stroke;
      ctx.stroke(path);
    });

    this.keyframes.initialized = true;
  }
  addPoint(point: Point) {
    this.points.push(point);
    this._init();
  }
}