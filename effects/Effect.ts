import Keyframes from '../core/Keyframes';

export default class Effect {
  keyframes: any;
  initialized: boolean = false;

  constructor(opts) {
    this.keyframes = new Keyframes();
    this.keyframes.userData = {
      x: opts && opts.x || 0,
      y: opts && opts.y || 0
    }
  }
  fromImage(imageUrl, frameCounts, cb){
    Keyframes.generateFramesfromImage(imageUrl, frameCounts, frames => {
      this.keyframes.setFrames(frames);
      this.initialized = true;
      cb();
    });
  }
  fromFrames(frames){
    this.keyframes.setFrames(frames);
    this.initialized = true;
  }
  draw(ctx) {
    if (!this.initialized) return;
    this.keyframes.drawFrame(ctx);
  }
}