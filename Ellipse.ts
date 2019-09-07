import DraggableShape from './DraggableShape';

export default class Ellipse extends DraggableShape {
  x: number = 0;
  y: number = 0;
  width: number = 100;
  height: number = 100;
  fillStyle = '#999';

  constructor(opts){
    super();
    this.set(opts);
  }
  getHitPath(){
    if(!this.hitPath){
      this.updateHitPath();
    }
    return this.hitPath;
  }
  getDrawPath(){
    if(!this.drawPath){
      this.updateDrawPath();
    }
    return this.drawPath;
  }
  updateDrawPath(){
    let path = new Path2D();
    path.ellipse(this.x, this.y, this.width/2, this.height/2, 0 * Math.PI / 180, 0, Math.PI * 2);
    this.drawPath = path;
  }
  updateHitPath(){
    let path = new Path2D();
    path.ellipse(this.x, this.y, this.width/2, this.height/2, 0 * Math.PI / 180, 0, Math.PI * 2);
    this.hitPath = path;
  }
  draw(ctx: any){
    if(!ctx) throw new Error('need ctx');
    this.drawPath = this.getDrawPath();
    ctx.fillStyle = this.fillStyle;
    ctx.stroke(this.drawPath);
    ctx.fill(this.drawPath);
  }
}