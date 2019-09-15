import Shape from './Shape';
import Ellipse from './Ellipse';

export default class Module extends Shape {
  imports: Array<Ellipse> = [];
  exports: Array<Ellipse> = [];
  name;
  textStyle;
  fontSize;
  minFontSize = 14;
  minHeight;
  width;
  height;
  text;
  r;

  constructor(opts){
    super(opts);

    this.fontSize = this.fontSize || this.minFontSize;
    if(this.fontSize < this.minFontSize){
      this.fontSize = this.minFontSize;
    }
  }
  updatePath(){
    let path = new Path2D();
    if(!this.r){
      path.rect(this.x, this.y, this.width, this.height);
    }else{
      let r2 = this.r * 2;
      path.moveTo(this.x + this.width / 2, this.y);
      path.lineTo(this.x + this.width - r2, this.y);
      path.bezierCurveTo(
        this.x + this.width - this.r, this.y,
        this.x + this.width, this.y + this.r,
        this.x + this.width, this.y  + r2
      );
      path.lineTo(this.x + this.width, this.y + this.height - r2);
      path.bezierCurveTo(
        this.x + this.width, this.y + this.height - this.r,
        this.x + this.width - this.r, this.y + this.height,
        this.x + this.width - r2, this.y + this.height
      );
      path.lineTo(this.x + r2, this.y + this.height);
      path.bezierCurveTo(
        this.x + this.r, this.y + this.height,
        this.x, this.y + this.height - this.r,
        this.x, this.y + this.height - r2,
      );
      path.lineTo(this.x, this.y + r2);
      path.bezierCurveTo(
        this.x, this.y + this.r,
        this.x + this.r, this.y,
        this.x + r2, this.y
      );
      path.closePath();
    }
    this.path = path;

    return this;
  }
  setText(ctx, text){
    this.text = text;
    ctx.font = `${this.fontSize * devicePixelRatio}px 微软雅黑`;
    this.width = parseInt(ctx.measureText(text).width);
  }
  draw(ctx){
    if(!ctx) throw new Error('need ctx');

    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke(this.path);
    ctx.fill(this.path);

    ctx.font = `${this.fontSize * devicePixelRatio}px 微软雅黑`;
    ctx.fillStyle = this.strokeStyle;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(this.name, this.x + this.width / 2, this.y + this.height / 2)
  }
}