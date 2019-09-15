import Point from './Point';
import Line from './Line';

export default class BezierLine extends Line {
  constructor(public startPoint: Point = new Point(0, 0), public endPoint: Point = new Point(0, 0)){
    super(startPoint, endPoint);
    this.updatePath();
  }
  updatePath(){
    let center = {
      x: this.startPoint.x + (this.endPoint.x-this.startPoint.x) / 2,
      y: this.startPoint.y + (this.endPoint.y-this.startPoint.y) / 2,
    }
    let c1 = {
      x: center.x,
      y: this.startPoint.y
    }
    let c2 = {
      x: center.x,
      y: this.endPoint.y
    }
    let path = new Path2D();
    path.moveTo(this.startPoint.x, this.startPoint.y);
    path.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, this.endPoint.x, this.endPoint.y);
    this.path = path;
  }
}