export default class Keyframes {
  frames: any;
  frameWidth: any;
  frameHeight: any;
  frameCounts: any;
  userData: any = {};
  sprite: HTMLCanvasElement;
  currentFrameNumber: any;

  constructor() {
    this.sprite = document.createElement('canvas');
  }
  static generateEmptyFrames(frameWidth, frameHeight, frameCounts) {
    let frames: any = [];
    for (let i = 0; i < frameCounts; i++) {
      let frame: any = document.createElement('canvas');
      frame.userData = {};
      frame.width = frameWidth;
      frame.height = frameHeight;
      frames.push(frame);
    }
    return frames;
  }
  static generateFramesfromImage(imageUrl, frameCounts, cb) {
    let image = new Image;
    image.onload = () => {
      let frameWidth = image.width / frameCounts;
      let frameHeight = image.height;
      let frames = Keyframes.generateEmptyFrames(frameWidth, frameHeight, frameCounts);
      for (let i = 0; i < frameCounts; i++) frames[i].getContext('2d').drawImage(image, -i * frameWidth, 0);
      cb(frames);
    }
    image.src = imageUrl;
  }
  setFrames(frames) {
    this.frames = frames;
    this.frameWidth = frames[0].width;
    this.frameHeight = frames[0].height;
    this.frameCounts = frames.length;
    this.currentFrameNumber = 1;
  }
  setCurrentFrame(frameNumber) {
    if (frameNumber < 1) frameNumber = 1;
    if (frameNumber > this.frameCounts) frameNumber = this.frameCounts;
    this.currentFrameNumber = frameNumber;
  }
  updateFrame(frameNumber, processor) {
    if (frameNumber >= 1 && frameNumber <= this.frameCounts) {
      processor(this.frames[frameNumber - 1].getContext('2d'));
    }
  }
  drawFrame(ctx) {
    ctx.drawImage(this.frames[this.currentFrameNumber - 1], this.userData.x, this.userData.y);
    this.currentFrameNumber++;
    if (this.currentFrameNumber > this.frameCounts) this.currentFrameNumber = 1;
  }
  updateSprite() {
    let sprite = this.sprite;
    sprite.width = this.frameWidth * this.frameCounts;
    sprite.height = this.frameHeight;
    let spriteCtx: any = sprite.getContext('2d');
    for (let i = 0; i < this.frameCounts; i++) {
      spriteCtx.drawImage(this.frames[i], this.frameWidth * i, 0);
    }
  }
}