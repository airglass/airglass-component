import Point from './Point';
import Line from './Line';

export default class ModuleLine extends Line {
  pointA: Point = new Point(100, 100);
  pointB: Point = new Point(200, 200);

  constructor(){
    super();
    this.updateDrawPath();
  }
  updateDrawPath(){
    let center = {
      x: this.pointA.x + (this.pointB.x-this.pointA.x) / 2,
      y: this.pointA.y + (this.pointB.y-this.pointA.y) / 2,
    }
    let c1 = {
      x: center.x,
      y: this.pointA.y
    }
    let c2 = {
      x: center.x,
      y: this.pointB.y
    }
    let path = new Path2D();
    path.moveTo(this.pointA.x, this.pointA.y);
    path.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, this.pointB.x, this.pointB.y);
    this.drawPath = path;
  }
}