import Shape from './Shape';
import Point from './Point';
import min from './utils/min';
import max from './utils/max';

export default class Polygon extends Shape {
  points;
  x;
  y;
  width;
  height;
  minX;
  minY;
  maxX;
  maxY;

  constructor(opts){
    super(opts);
  }
  addPoint(point: Point){
    this.points.push(point);
    this.updatePath();
  }
  _updateBounding(){
    let x: any = [];
    let y: any = [];
    for(let i=0; i<this.points.length; i++){
      let point = this.points[i];
      x.push(point.x);
      y.push(point.y);
    }
    this.minX = min(x);
    this.minY = min(y);
    this.maxX = max(x);
    this.maxY = max(y);
    this.width = this.maxX - this.minX;
    this.height = this.maxY - this.minY;
    this.x = this.minX + this.width / 2;
    this.y = this.minY + this.height / 2;
  }
  updatePath(){
    if(!this.points || this.points.length == 0) return;
    let path = new Path2D();
    for(let i=0; i<this.points.length; i++){
      let point = this.points[i];
      if(i == 0){
        path.moveTo(point.x, point.y);
        continue;
      }
      path.lineTo(point.x, point.y);
    }
    this.path = path;
    this._updateBounding();
  }
  draw(ctx){
    if(!this.path) return;
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke(this.path);
    ctx.fill(this.path);
  }
}