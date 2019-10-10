import Shape from '../core/Shape';
import AlterProgress from '../core/AlterProgress';
import Keyframes from '../core/Keyframes';

export default class RadarWave extends Shape {
  maxSize: number;
  maxOpacity: number;
  hue: number;
  progress: any;
  keyframes: Keyframes;
  keyRate: number;

  constructor(opts) {
    super(opts);
    this.hue = opts.hue || 0;
    this.maxSize = opts.maxSize || 30;
    this.maxOpacity = opts.maxOpacity || 1;
    this.progress = new AlterProgress(0, this.maxOpacity);
    this.keyRate = opts.keyRate || 30;

    let _maxSize_2 = this.maxSize * devicePixelRatio;
    let _halfMaxSize = (this.maxSize / 2) * devicePixelRatio;
    this.keyframes = new Keyframes(
      this.x - _halfMaxSize,
      this.y - _halfMaxSize,
      _maxSize_2,
      _maxSize_2
    );
    this.generateKeyframes(this.keyRate);
  }
  generateKeyframes(frameCounts) {
    let step = 1 / frameCounts;
    for (let i = 0; i < frameCounts; i++) {
      let t = i * step;
      this.progress._radarOpacity = this.progress.getValue(t);
      this.progress._radarSize = this.maxSize * t;
      let canvas = this.keyframes.addKeyframe();
      this._draw(canvas.getContext('2d'));
    }
    this.keyframes.frames.forEach(frame => {
      console.log(frame.toDataURL());
    })
  }
  _draw(ctx) {
    ctx.fillStyle = this.fill;
    ctx.fill(this.path);

    ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.progress._radarOpacity})`;
    ctx.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${this.progress._radarOpacity + 0.1})`;
    let path = new Path2D;
    path.arc((this.maxSize / 2) * devicePixelRatio, (this.maxSize / 2) * devicePixelRatio, this.progress._radarSize, 0, Math.PI * 2, true);
    ctx.fill(path);
    ctx.stroke(path);
  }
  draw(ctx) {
    let frame = this.keyframes.getCurrentFrame();
    if (!frame) return;
    ctx.drawImage(frame, this.keyframes.x, this.keyframes.y);
  }
}