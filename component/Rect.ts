import InteractableShape from '../core/InteractableShape';

export default class Rect extends InteractableShape {
  width: number;
  height: number;
  
  constructor(params?: any){
    super(params);
    this.width = params && params.width || 100;
    this.height = params && params.height || 100;
  }
  updatePath(){
    let path: Path2D = new Path2D();
    path.rect(this.x, this.y, this.width, this.height);
    this.path = path;
  }
  draw(ctx: CanvasRenderingContext2D){
    if(!ctx) throw new Error('need ctx');
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.line;
    ctx.stroke(this.path);
    ctx.fill(this.path);
  }
}