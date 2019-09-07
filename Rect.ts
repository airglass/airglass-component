import DraggableShape from './DraggableShape';

export default class Rect extends DraggableShape {
  x: number = 0;
  y: number = 0;
  width: number = 100;
  height: number = 100;
  fillStyle: string = '#444';

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
    path.rect(this.x - this.width/2, this.y-this.height/2, this.width, this.height); 
    this.drawPath = path;
  }
  updateHitPath(){
    let path = new Path2D();
    path.rect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    this.hitPath = path;
  }
  draw(ctx){
    if(!ctx) throw new Error('need ctx');
    this.drawPath = this.getDrawPath();
    ctx.fillStyle = this.fillStyle;
    ctx.stroke(this.drawPath);
    ctx.fill(this.drawPath);
  }
}