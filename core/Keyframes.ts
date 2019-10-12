export default class Keyframes {
  frames: any;
  frameWidth: any;
  frameHeight: any;
  frameCounts: any;
  userData: any;
  sprite: HTMLCanvasElement;
  _currentFrameNumber: any;

  constructor() {
    this.sprite = document.createElement('canvas');
  }
  static generateEmptyKeyframes(frameWidth, frameHeight, frameCounts) {
    let frames: any = [];
    for (let i = 0; i < frameCounts; i++) {
      let frame: any = document.createElement('canvas');
      frame.userData = {};
      frame.width = frameWidth;
      frame.height = frameHeight;
      frames.push(frame);
    }
    let keyframes = new Keyframes();
    keyframes.setFrames(frames);
    return keyframes;
  }
  static generateKeyframesfromImage(url, frameCounts, userData, cb) {
    let image = new Image;
    image.src = url;
    image.onload = () => {
      let frameWidth = image.width / frameCounts;
      let frameHeight = image.height;
      let keyframes = Keyframes.generateEmptyKeyframes(frameWidth, frameHeight, frameCounts); 
      userData.x -= frameWidth / 2;
      userData.y -= frameHeight / 2;
      keyframes.userData = userData;
      for (let i = 0; i < keyframes.frames.length; i++) {
        let frame = keyframes.frames[i];
        frame.userData = {};
        let ctx = frame.getContext('2d');
        ctx.drawImage(image, -i * frameWidth, 0)
      }
      cb && cb(keyframes);
    }
  }
  setFrames(frames) {
    this.frames = frames;
    this.frameWidth = frames[0].width;
    this.frameHeight = frames[0].height;
    this.frameCounts = frames.length;
    this._currentFrameNumber = 1;
  }
  setCurrentFrame(frameNumber) {
    if (frameNumber < 1) frameNumber = 1;
    if (frameNumber > this.frameCounts) frameNumber = this.frameCounts;
    this._currentFrameNumber = frameNumber;
  }
  updateFrame(frameNumber, processor) {
    if (frameNumber >= 1 && frameNumber <= this.frameCounts) {
      processor(this.frames[frameNumber - 1]);
    }
  }
  getFrame(frameNumber) {
    this.setCurrentFrame(frameNumber);
    return this.frames[this._currentFrameNumber - 1];
  }
  getFrames(){
    return this.frames;
  }
  getCurrentFrameGoNext() {
    let frame = this.getFrame(this._currentFrameNumber);
    this._currentFrameNumber++;
    if (this._currentFrameNumber > this.frameCounts) this._currentFrameNumber = 1;
    return frame;
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