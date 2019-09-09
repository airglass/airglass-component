import Element from './Element';
import Point from './Point';

export default class Line extends Element {
  pointA: Point = new Point(0, 0);
  pointB: Point = new Point(100, 100);
  drawPath;

  constructor(){
    super()
    this.updateDrawPath();
  }
  updateDrawPath(){
    let path = new Path2D();
    path.moveTo(this.pointA.x, this.pointA.y);
    path.lineTo(this.pointB.x, this.pointB.y);
    this.drawPath = path;
  }
  draw(ctx) {
    if (!ctx) throw new Error('Line Need Context');
    ctx.stroke(this.drawPath);
  }
}