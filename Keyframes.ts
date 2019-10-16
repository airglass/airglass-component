export default class Keyframes {
  frames: any;
  frameWidth: any;
  frameHeight: any;
  frameCounts: any;
  sprite: HTMLCanvasElement;
  currentFrameIndex: any;
  initialized: boolean;

  constructor() {
    this.sprite = document.createElement('canvas');
    this.initialized = false;
  }
  static generateEmptyFrames(frameWidth, frameHeight, frameCounts) {
    let frames: any = [];
    for (let i = 0; i < frameCounts; i++) {
      let frame: any = document.createElement('canvas');
      frame.width = frameWidth;
      frame.height = frameHeight;
      frames.push(frame);
    }
    return frames;
  }
  fromImage(imageUrl, frameCounts, cb) {
    let image = new Image;
    image.onload = () => {
      let frameWidth = image.width / frameCounts;
      let frameHeight = image.height;
      let frames = Keyframes.generateEmptyFrames(frameWidth, frameHeight, frameCounts);
      for (let i = 0; i < frameCounts; i++) frames[i].getContext('2d').drawImage(image, -i * frameWidth, 0);
      this.setFrames(frames);
      this.initialized = true;
      cb(this);
    }
    image.src = imageUrl;
  }
  fromFrames(frames) {
    this.setFrames(frames);
    this.initialized = true;
  }
  setFrames(frames) {
    this.frames = frames;
    this.frameWidth = frames[0].width;
    this.frameHeight = frames[0].height;
    this.frameCounts = frames.length;
    this.currentFrameIndex = 0;
  }
  setFrameIndex(frameIndex) {
    if (frameIndex < 0) frameIndex = 0;
    if (frameIndex >= this.frameCounts) frameIndex = this.frameCounts-1;
    this.currentFrameIndex = frameIndex;
  }
  updateFrames(frameWidth, frameHeight, frameCounts, frameProcessor) {
    let frames = Keyframes.generateEmptyFrames(frameWidth, frameHeight, frameCounts);
    this.setFrames(frames);
    for (let i = 0; i < frameCounts; i++) {
      frameProcessor(i, this.frames[i].getContext('2d'));
    }
  }
  drawFrame(ctx, drawX, drawY) {
    ctx.drawImage(this.frames[this.currentFrameIndex], drawX, drawY);
    this.currentFrameIndex++;
    if (this.currentFrameIndex >= this.frameCounts) this.currentFrameIndex = 0;
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