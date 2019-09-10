import Shape from './Shape';

export default class Rect extends Shape {
  width: number = 100;
  height: number = 100;

  constructor(opts){
    super(opts);
    this.set(opts);
  }
  getHitPath(){
    if(!this._hitPath){
      this.updateHitPath();
    }
    return this._hitPath;
  }
  getDrawPath(){
    if(!this._drawPath){
      this.updateDrawPath();
    }
    return this._drawPath;
  }
  updateDrawPath(){
    let path = new Path2D();
    path.rect(this.x - this.width/2, this.y-this.height/2, this.width, this.height); 
    this._drawPath = path;
  }
  updateHitPath(){
    let path = new Path2D();
    path.rect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    this._hitPath = path;
  }
  draw(ctx){
    if(!ctx) throw new Error('need ctx');
    this._drawPath = this.getDrawPath();
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke(this._drawPath);
    ctx.fill(this._drawPath);
  }
}