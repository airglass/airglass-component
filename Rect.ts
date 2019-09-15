import Shape from './Shape';

export default class Rect extends Shape {
  // 宽度
  width: number = 10;
  // 高度
  height: number = 100;
  // 构造函数
  constructor(opts){
    super(opts);
  }
  // 更新绘制路径
  updatePath(){
    let path: Path2D = new Path2D();
    path.rect(this.x, this.y, this.width, this.height);
    this.path = path;
  }
  // 绘制
  draw(ctx: CanvasRenderingContext2D){
    if(!ctx) throw new Error('need ctx');
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke(this.path);
    ctx.fill(this.path);
  }
}