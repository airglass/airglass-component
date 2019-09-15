import Shape from './Shape';

export default class Rect extends Shape {
  width: number;
  height: number;
  
  constructor(opts: any){
    super(opts);

    this.width = opts.width || 100;
    this.height = opts.height || 100;
  }
  updatePath(){
    if(!this.width || !this.height) return;
    let path: Path2D = new Path2D();
    path.rect(this.x, this.y, this.width, this.height);
    this.path = path;
  }
  draw(ctx: CanvasRenderingContext2D){
    if(!ctx) throw new Error('need ctx');
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke(this.path);
    ctx.fill(this.path);
  }
}