import Progress from './Progress';

export default class AlterProgress extends Progress {
  constructor(public startValue: number = 0,
    public endValue: number = 10,
    public t: number = 0,
    public step: number = 0.05) {
    super(startValue, endValue, t, step);
  }
  _getValue() {
    let value;
    if (this.t >= 0 && this.t < 0.5)
      value = this.startValue + this.dis * this.t * 2;
    else
      value = this.startValue + this.dis * (2 - this.t * 2);
    return value;
  }
}