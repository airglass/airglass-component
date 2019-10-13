export default class Progress {
  startValue: number;
  endValue: number;
  t: number;
  step: number;
  value: number;
  valueLength: number;
  constructor(startValue, endValue, t, step) {
    this.value = this.startValue = startValue || 0;
    this.endValue = endValue || 1;
    (t >= 0 && t <= 1) ? (this.t = t) : (this.t = 0);
    this.step = step || 0.1;
    this.valueLength = endValue - startValue;
  }
  getValue(t) {
    return this.startValue + this.valueLength * t;
  }
  drive() {
    let value = this.getValue(this.t);
    this.t += this.step;
    this.t > 1 && (this.t = 0);
    return this.value = value;
  }
}