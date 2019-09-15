import Shape from './Shape';

export default class Rect extends Shape {
  width: number = 10;
  height: number = 100;

  constructor(opts){
    super(opts);
  }
  updatePath(){
    let path = new Path2D();
    path.rect(this.x, this.y, this.width, this.height);
    this.path = path;
  }
  draw(ctx){
    if(!ctx) throw new Error('need ctx');
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke(this.path);
    ctx.fill(this.path);
  }
}