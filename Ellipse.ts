import Shape from './Shape';

export default class Ellipse extends Shape {
  width: number = 100;
  height: number = 100;

  constructor(opts){
    super(opts);
  }
  updatePath(){
    let path: Path2D = new Path2D();
    path.ellipse(this.x, this.y, this.width/2, this.height/2, 0, 0, Math.PI * 2, true);
    this.path = path;
  }
  draw(ctx: CanvasRenderingContext2D){
    if(!ctx) throw new Error('need ctx');
    ctx.fillStyle = this.fillStyle;
    if(this.strokeStyle){
      ctx.stroke(this.path);
      ctx.strokeStyle = this.strokeStyle; 
    }
    ctx.lineWidth = this.lineWidth;
    ctx.fill(this.path);
  }
}