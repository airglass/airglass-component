import Shape from './Shape';

export default class Ellipse extends Shape {
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
    path.ellipse(this.x, this.y, this.width/2, this.height/2, 0, 0, Math.PI * 2, true);
    this._drawPath = path;
  }
  updateHitPath(){
    let path = new Path2D();
    path.ellipse(this.x, this.y, this.width/2, this.height/2, 0, 0, Math.PI * 2, true);
    this._hitPath = path;
  }
  draw(ctx){
    if(!ctx) throw new Error('need ctx');
    this._drawPath = this.getDrawPath();
    ctx.fillStyle = this.fillStyle;
    ctx.stroke(this._drawPath);
    ctx.fill(this._drawPath);
  }
}