import Shape from './Shape';

export default class Ellipse extends Shape {
  width: number = 100;
  height: number = 100;

  constructor(opts){
    super(opts);
    this.set(opts);
  }
  updatePath(){
    let path = new Path2D();
    path.ellipse(this.x, this.y, this.width/2, this.height/2, 0, 0, Math.PI * 2, true);
    this.path = path;
  }
  draw(ctx){
    if(!ctx) throw new Error('need ctx');
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke(this.path);
    ctx.fill(this.path);
  }
}