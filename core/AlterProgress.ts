import Progress from './Progress';

export default class AlterProgress extends Progress {
  constructor(public startValue: number = 0,
    public endValue: number = 10,
    public t: number = 0,
    public step: number = 0.05) {
    super(startValue, endValue, t, step);
  }
  getValue(t) {
    let value;
    if (t >= 0 && t < 0.5)
      value = this.startValue + this.dis * t * 2;
    else
      value = this.startValue + this.dis * (2 - t * 2);
    return value;
  }
}