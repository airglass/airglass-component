import Shape from '../core/Shape';

class Progress {
  value: number;
  dis: number;
  constructor(
    public startValue: number = 0,
    public endValue: number = 10,
    public t: number = 0,
    public step: number = 0.05
  ) {
    this.dis = endValue - startValue;
    this.value = this.drive();
  }
  _getValue() {
    return this.startValue + this.dis * this.t;
  }
  drive() {
    if (this.t > 1) {
      this.t = 0;
    }
    let value = this._getValue();
    this.t += this.step;
    return this.value = value;
  }
}

class AlterProgress extends Progress {
  constructor(public startValue: number = 0,
    public endValue: number = 10,
    public t: number = 0,
    public step: number = 0.05) {
    super(startValue, endValue, t, step);
  }
  _getValue() {
    let value;
    if (this.t >= 0 && this.t < 0.5)
      value = this.startValue + this.dis * this.t * 2;
    else
      value = this.startValue + this.dis * (2 - this.t * 2);
    return value;
  }
}

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