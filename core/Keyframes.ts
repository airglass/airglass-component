export default class Keyframes {
  frames: Array<HTMLCanvasElement> = [];
  framesLength: number = 0;
  _order: number = 1;

  constructor(
    public x: number, public y: number,
    public width: number, public height: number
  ) {

  }
  addKeyframe() {
    let canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.width;
    this.frames.push(canvas);
    this.framesLength++;
    return canvas;
  }
  getCurrentFrame() {
    return this.frames[this._order - 1];
  }
  go(order) {
    if (order < 1 || order > this.framesLength) return new Error(`Out of range 1-${this.framesLength}`);
    this._order = order;
  }
  goNext() {
    if (this._order == this.framesLength) {
      this.goStart();
    } else {
      this._order += 1;
    }
  }
  goStart() {
    this.go(1);
  }
  goEnd() {
    this.go(this.framesLength);
  }
}