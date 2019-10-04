import Point from './Point';

export default class Line {
  path: Path2D;
  stroke: string;
  line: number;
  
  constructor(public startPoint: Point = new Point(0, 0), public endPoint: Point = new Point(0, 0)){
    this.path = new Path2D;
    this.stroke = '#666';
    this.line = 2;
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
    ctx.lineCap = 'round';
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.line;
    ctx.stroke(this.path);
  }
}