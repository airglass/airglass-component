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
  progress: any;
  initialized: boolean = false;

  constructor(opts) {
    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.hue = opts.hue || 0;
    this.radarSize = opts.radarSize * devicePixelRatio || 30 * devicePixelRatio;
    this.maxOpacity = opts.maxOpacity || 1;
    this.progress = new AlterProgress(0, this.maxOpacity);
    this.frameCounts = opts.frameCounts || 24;

    let frameWidth = this.radarSize;
    let frameHeight = this.radarSize;
    let frameCounts = this.frameCounts;
    let halfRadarSize = this.radarSize / 2;
    let frames = Keyframes.generateEmptyFrames(frameWidth, frameHeight, frameCounts);
    this.keyframes = new Keyframes();
    this.keyframes.userData = {
      x: this.x - halfRadarSize,
      y: this.y - halfRadarSize,
      halfRadarSize: halfRadarSize
    }
    this.keyframes.setFrames(frames);
    let step = 1 / this.frameCounts;
    for (let i = 0; i < this.frameCounts; i++) {
      let t = i * step;
      this.progress._radarOpacity = this.progress.getValue(t);
      this.progress._radarRadius = halfRadarSize * t;
      this.keyframes.updateFrame(i + 1, ctx => {
        ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.progress._radarOpacity})`;
        ctx.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${this.progress._radarOpacity + 0.1})`;
        let path = new Path2D;
        path.arc(this.keyframes.userData.halfRadarSize, this.keyframes.userData.halfRadarSize, this.progress._radarRadius, 0, Math.PI * 2, true);
        ctx.fill(path);
        ctx.stroke(path);
      });
    }
    this.initialized = true;
  }
  draw(ctx) {
    if (!this.initialized) return;
    this.keyframes.drawFrame(ctx);
  }
}