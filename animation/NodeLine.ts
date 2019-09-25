import BezierLine from '../line/BezierLine';
import Point from '../core/Point';

export default class NodeLine extends BezierLine {
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