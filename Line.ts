import Point from './Point';

export default class Line {
  constructor(public pointA: Point, public pointB: Point){
    if (!pointA || !pointB) throw new Error('need two points');
  }
  draw(ctx) {
    if (!ctx) throw new Error('need context');
    let path = new Path2D();
    path.moveTo(this.pointA.x, this.pointA.y);
    path.lineTo(this.pointB.x, this.pointB.y);
    ctx.stroke(path);
  }
}