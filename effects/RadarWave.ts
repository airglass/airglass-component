import AlterProgress from '../core/AlterProgress';
import Keyframes from '../core/Keyframes';

export default class RadarWave {
  x: number;
  y: number;
  radarSize: number;
  maxOpacity: number;
  hue: number;
  keyframes: any;
  frameCounts: any;
  _progress: any;
  _initialized: boolean = false;

  constructor(opts) {
    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.hue = opts.hue || 0;
    this.radarSize = opts.radarSize * devicePixelRatio || 30 * devicePixelRatio;
    this.maxOpacity = opts.maxOpacity || 1;
    this._progress = new AlterProgress(0, this.maxOpacity);
    this.frameCounts = opts.frameCounts || 30;

    let frameWidth = this.radarSize;
    let frameHeight = this.radarSize;
    let frameCounts = this.frameCounts;
    let halfRadarSize = this.radarSize / 2;
    this.keyframes = Keyframes.generateEmptyKeyframes(frameWidth, frameHeight, frameCounts);
    this.keyframes.userData = {
      x: this.x - halfRadarSize,
      y: this.y - halfRadarSize,
      halfRadarSize: halfRadarSize
    }
    let step = 1 / this.frameCounts;
    for (let i = 0; i < this.frameCounts; i++) {
      let t = i * step;
      this._progress._radarOpacity = this._progress.getValue(t);
      this._progress._radarRadius = halfRadarSize * t;
      this.keyframes.updateFrame(i + 1, frame => {
        let ctx = frame.getContext('2d');
        this._draw(ctx);
      });
    }
    this._initialized = true;
  }
  _draw(ctx) {
    ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this._progress._radarOpacity})`;
    ctx.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${this._progress._radarOpacity + 0.1})`;

    let path = new Path2D;
    path.arc(this.keyframes.userData.halfRadarSize, this.keyframes.userData.halfRadarSize, this._progress._radarRadius, 0, Math.PI * 2, true);
    ctx.fill(path);
    ctx.stroke(path);
  }
  draw(ctx) {
    if (!this._initialized) return;
    let frame = this.keyframes.getCurrentFrameGoNext();
    ctx.drawImage(frame, this.keyframes.userData.x, this.keyframes.userData.y);
  }
}