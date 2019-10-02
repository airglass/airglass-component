import Shape from '../core/Shape';
import AlterProgress from '../core/AlterProgress';

export default class RadarWave extends Shape {
  maxSize: number;
  maxOpacity: number;
  hue: number;
  tSpeed: number;
  length: number;
  _progresses: Array<any> = [];

  constructor(opts) {
    super(opts);
    this.hue = opts.hue || 0;
    this.maxSize = opts.maxSize || 30 + Math.ceil(Math.random() * 30);
    this.tSpeed = opts.tSpeed || 1 / this.maxSize;
    this.length = opts.length || 3;
    let _step = +(1 / this.length).toFixed(1);
    this.maxOpacity = opts.maxOpacity || _step;

    for (let i = 0; i < this.length; i++) {
      this._progresses.push(new AlterProgress(0, this.maxOpacity, i * _step, this.tSpeed));
    }
  }
  drive() {
    this._progresses.forEach(progress => {
      progress._radarOpacity = progress.drive();
      progress._radarSize = this.maxSize * progress.t;
    })
  }
  draw(ctx) {
    ctx.fillStyle = this.fill;
    ctx.fill(this.path);

    this._progresses.forEach(progress => {
      ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${progress._radarOpacity})`;
      ctx.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${progress._radarOpacity + 0.1})`;
      let path = new Path2D;
      path.arc(this.x, this.y, progress._radarSize, 0, Math.PI * 2, true);
      ctx.fill(path);
      ctx.stroke(path);
    })
  }
}