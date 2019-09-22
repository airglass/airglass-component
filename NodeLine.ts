import BezierLine from './BezierLine';
import Point from './Point';

export default class NodeLine extends BezierLine {
  lightWidth: number = 20;
  length: number;
  t: number;
  boundWidth: number;
  boundHeight: number;
  tSpeed: number;

  constructor(
    public startPoint: Point = new Point(0, 0),
    public endPoint: Point = new Point(0, 0)) {
    super(startPoint, endPoint);
    this.boundWidth = endPoint.x - startPoint.x;
    this.boundHeight = endPoint.y - startPoint.y;
    this.length = Math.ceil(Math.sqrt(Math.pow(this.boundWidth, 2) + Math.pow(this.boundHeight, 2)));
    this.t = 0;
    this.tSpeed = 1 / this.length;
  }
  updateLight() {
    this.t += this.tSpeed;
    if (this.t > 1) this.t = 0;
    let x = this.startPoint.x + this.boundWidth * this.t;
    let y = this.startPoint.y + this.t * this.boundHeight;
    return {
      p1: new Point(x - this.boundWidth * .1, y - this.boundHeight * .1),
      center: new Point(x, y),
      p2: new Point(x + this.boundWidth * .1, y + this.boundHeight * .1),
    };
  }
}