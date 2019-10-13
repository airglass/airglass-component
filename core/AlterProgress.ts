import Progress from './Progress';

export default class AlterProgress extends Progress {
  constructor(startValue, endValue, t?, step?) {
    super(startValue, endValue, t, step);
  }
  // 重写Progress的getValue()方法
  getValue(t) {
    let value;
    if (t >= 0 && t < 0.5) {
      value = this.startValue + this.valueLength * t * 2;
    } else {
      value = this.startValue + this.valueLength * (2 - t * 2);
    }
    return value;
  }
}