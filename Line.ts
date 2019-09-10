import Element from './Element';
import Point from './Point';

export default class Line extends Element {
  drawPath;

  strokeStyle: string = '#666';
  lineWidth: number = 2;

  constructor(public startPoint: Point = new Point(0, 0), public endPoint: Point = new Point(0, 0)){
    super()
    this.updateDrawPath();
  }
  updateDrawPath(){
    let path = new Path2D();
    path.moveTo(this.startPoint.x, this.startPoint.y);
    path.lineTo(this.startPoint.x, this.startPoint.y);
    this.drawPath = path;
  }
  draw(ctx) {
    if (!ctx) throw new Error('Line Need Context');
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke(this.drawPath);
  }
}