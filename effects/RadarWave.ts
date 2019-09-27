import Circle from '../element/Circle';

export default class RadarWave extends Circle {
  radarSize: number = 0;
  scale: number = 2;
  randomSize: number = 30;
  radarMaxSize: number = this.scale * 10 + Math.ceil(Math.random() * this.randomSize);
  radarOpacity: number = 0;
  t: number = Math.random();
  hue: number = 160;
  tSpeed: number = this.scale / this.radarMaxSize;

  constructor(opts) {
    super(opts);
  }
  drive() {
    this.t += this.tSpeed;

    let t = Number(this.t / 0.5);
    if (t >= 0 && t < 1) {
      this.radarOpacity = t;
    } else {
      this.radarOpacity = 2 - t;
    }
    this.radarSize = this.radarMaxSize * this.t;
    if (this.t > 1) {
      this.t = 0;
      this.radarMaxSize = this.scale * 10 + Math.ceil(Math.random() * this.randomSize);
    }
  }
  draw(ctx) {
    ctx.fillStyle = this.fill;
    ctx.fill(this.path);

    ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.radarOpacity})`;
    ctx.strokeStyle = `hsla(160, 100%, 50%, ${this.radarOpacity + 0.3})`;
    let path = new Path2D;
    path.arc(this.x, this.y, this.radarSize, 0, Math.PI * 2, true);
    ctx.fill(path);
    ctx.stroke(path);
  }
}