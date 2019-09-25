import Ellipse from '../shape/Ellipse';

export default class RadarWave extends Ellipse {
  radarSize: number = 0;
  scale: number = 4;
  radarMaxSize: number = this.scale * 10 + Math.ceil(Math.random() * 30);
  radarOpacity: number = 0;
  t: number = Math.random();
  tSpeed: number = this.scale / this.radarMaxSize;

  constructor(opts) {
    super(opts);
  }
  drive() {
    this.t += this.tSpeed;

    let t = Number((this.t / 0.5).toFixed(3));
    if (t >= 0 && t < 1) {
      this.radarOpacity = t;
    } else {
      this.radarOpacity = 2 - t;
    }
    this.radarSize = this.radarMaxSize * this.t;
    this.t > 1 && (this.t = 0);
  }
  draw(ctx) {
    ctx.fillStyle = `hsla(180, 70%, 50%, ${this.radarOpacity})`;
    let path = new Path2D;
    path.arc(this.x, this.y, this.radarSize, 0, Math.PI * 2, true);
    ctx.fill(path);
  }
}