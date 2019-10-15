import AlterProgress from '../core/AlterProgress';
import Renderable from '../core/Renderable';

export default class RadarWave extends Renderable {
  radarSize: number;
  hue: number;
  frameCounts: any;
  progress: any;

  constructor(params?) {
    super();
    this.hue = params && params.hue || 0;
    this.radarSize = params && params.radarSize * devicePixelRatio || 30 * devicePixelRatio;
    this.progress = new AlterProgress();
    this.frameCounts = params && params.frameCounts || 24;
    this._init();
  }
  _init(){
    this.bounds.width = this.bounds.height = this.radarSize;
    let halfRadarSize = this.bounds.width / 2;
    let step = 1 / this.frameCounts;
    this.keyframes.updateFrames(this.bounds.width, this.bounds.height, this.frameCounts, (i, ctx) => {
      let t = i * step;
      let radarOpacity = this.progress.getValue(t);
      let radarRadius = halfRadarSize * t;
      ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${radarOpacity})`;
      ctx.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${radarOpacity + 0.2})`;
      let path = new Path2D;
      path.arc(halfRadarSize, halfRadarSize, radarRadius, 0, Math.PI * 2, true);
      ctx.fill(path);
      ctx.stroke(path);
    });
    this.keyframes.initialized = true;
  }
}