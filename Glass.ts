export default class Glass {
  subscribers: Function[];
  isMouseDown: boolean = false;
  event: any;
  DPR: number;
  element: any;

  constructor(params) {
    this.element = params.element;
    this.subscribers = [];
    this.event = {};
    this.DPR = params.DPR || window.devicePixelRatio;
  }
  setStyleSize(width: number, height: number) {
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }
  setAttrSize(width: number, height: number) {
    this.element.width = width;
    this.element.height = height;
  }
  emitSubscribers(event, originEvent) {
    this.subscribers.forEach(subscriber => subscriber(event, originEvent))
  }
  subscribe(subscriber: Function) {
    this.subscribers.push(subscriber);
  }
}