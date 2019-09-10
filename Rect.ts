import Shape from './Shape';

export default class Rect extends Shape {
  width: number = 100;
  height: number = 100;

  constructor(opts){
    super(opts);
    this.set(opts);

    this.updatePath();
  }
  updatePath(){
    let path = new Path2D();
    path.rect(this.x - this.width/2, this.y-this.height/2, this.width, this.height); 
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