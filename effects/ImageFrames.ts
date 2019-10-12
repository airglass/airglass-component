import Keyframes from '../core/Keyframes';

export default class ImageFrames {
  x: number;
  y: number;
  keyframes: any;
  _initialized: any = false;

  constructor(opts) {
    this.x = opts.x || 0;
    this.y = opts.y || 0;

    Keyframes.generateKeyframesfromImage(opts.url, opts.frameCounts, {
      x: this.x,
      y: this.y
    }, keyframes => {
      this.keyframes = keyframes;
      this._initialized = true;
        opts.onReady && opts.onReady(this);
    });
  }
  draw(ctx) {
    if (!this._initialized) return;
    let frame = this.keyframes.getCurrentFrameGoNext();
    ctx.drawImage(frame, this.keyframes.userData.x, this.keyframes.userData.y);
  }
}