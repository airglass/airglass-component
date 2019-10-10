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
    getValue(t) {
      return this.startValue + this.dis * t;
    }
    drive() {
      if (this.t > 1) {
        this.t = 0;
      }
      let value = this.getValue(this.t);
      this.t += this.step;
      return this.value = value;
    }
  }