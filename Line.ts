import Element from './Element';
import Point from './Point';

export default class Line extends Element {
  path: Path2D = new Path2D;
  strokeStyle: string = '#666';
  lineWidth: number = 2;
  
  constructor(
    public startPoint: Point = new Point(0, 0),
    public endPoint: Point = new Point(0, 0)){
    super();
  }
  updatePath(){
    let path: Path2D = new Path2D();
    path.moveTo(this.startPoint.x, this.startPoint.y);
    path.lineTo(this.endPoint.x, this.endPoint.y);
    this.path = path;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) throw new Error('Line Need Context');
    if(!this.path) return;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke(this.path);
  }
}