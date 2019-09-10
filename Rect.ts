import Shape from './Shape';

export default class Rect extends Shape {
  width: number = 100;
  height: number = 100;
  rx: number = 0;
  ry: number = 0;

  constructor(opts?){
    super();
    opts && this.set(opts);
  }
  updatePath(){
    let path = new Path2D();
    if(this.rx == 0 && this.ry == 0){
      path.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }else{
      path.moveTo(this.x, this.y - this.height / 2);
      path.lineTo(this.x + this.width / 2 - this.rx * 2, this.y - this.height / 2);
      path.bezierCurveTo(
        this.x + this.width / 2 - this.rx, this.y - this.height / 2,
        this.x + this.width / 2, this.y - this.height / 2 + this.ry,
        this.x + this.width / 2, this.y - this.height / 2 + this.ry * 2
      );
      path.lineTo(this.x + this.width / 2, this.y + this.height / 2 - this.ry * 2);
      path.bezierCurveTo(
        this.x + this.width / 2, this.y + this.height / 2 - this.ry,
        this.x + this.width / 2 - this.rx, this.y + this.height / 2,
        this.x + this.width / 2 - this.rx * 2, this.y + this.height / 2
      );
      path.lineTo(this.x - this.width / 2 + this.rx * 2, this.y + this.height / 2);
      path.bezierCurveTo(
        this.x - this.width / 2 + this.rx, this.y + this.height / 2,
        this.x - this.width / 2, this.y + this.height / 2 - this.ry,
        this.x - this.width / 2, this.y + this.height / 2 - this.ry * 2,
      );
      path.lineTo(this.x - this.width / 2, this.y - this.height / 2 + this.ry * 2);
      path.bezierCurveTo(
        this.x - this.width / 2, this.y - this.height / 2 + this.ry,
        this.x - this.width / 2 + this.rx, this.y - this.height / 2,
        this.x - this.width / 2 + this.rx * 2, this.y - this.height / 2
      );
      path.closePath();
    }
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