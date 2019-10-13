import AlterProgress from '../core/AlterProgress';
import Keyframes from '../core/Keyframes';
import Renderable from '../core/Renderable';

export default class RadarWave extends Renderable {
  radarSize: number;
  maxOpacity: number;
  hue: number;
  keyframes: any;
  frameCounts: any;
  progress: any;

  constructor(params) {
    super(params);
    this.hue = params.hue || 0;
    this.radarSize = params.radarSize * devicePixelRatio || 30 * devicePixelRatio;
    this.maxOpacity = params.maxOpacity || 1;
    this.progress = new AlterProgress(0, this.maxOpacity);
    this.frameCounts = params.frameCounts || 24;

    let frameWidth = this.radarSize;
    let frameHeight = this.radarSize;
    let frameCounts = this.frameCounts;
    let halfRadarSize = this.radarSize / 2;
    let frames = Keyframes.generateEmptyFrames(frameWidth, frameHeight, frameCounts);
    this.keyframes.setFrames(frames);
    let step = 1 / this.frameCounts;
    for (let i = 0; i < this.frameCounts; i++) {
      let t = i * step;
      let radarOpacity = this.progress.getValue(t);
      let radarRadius = halfRadarSize * t;
      this.keyframes.updateFrame(i + 1, ctx => {
        ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${radarOpacity})`;
        ctx.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${radarOpacity + 0.1})`;
        let path = new Path2D;
        path.arc(halfRadarSize, halfRadarSize, radarRadius, 0, Math.PI * 2, true);
        ctx.fill(path);
        ctx.stroke(path);
      });
    }
    this.keyframes.initialized = true;
  }
}