export default class Progress {
    value: number;
    dis: number;
    constructor(
      public startValue: number = 0,
      public endValue: number = 10,
      public t: number = 0,
      public step: number = 0.05
    ) {
      this.dis = endValue - startValue;
      this.value = this.drive();
    }
    _getValue() {
      return this.startValue + this.dis * this.t;
    }
    drive() {
      if (this.t > 1) {
        this.t = 0;
      }
      let value = this._getValue();
      this.t += this.step;
      return this.value = value;
    }
  }