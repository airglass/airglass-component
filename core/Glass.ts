export default class Glass {
  subscribers: Function[];
  isMouseDown: boolean = false;
  event: any;

  constructor(public wrapElement: any) {
    this.subscribers = [];
    this.event = {};
  }
  setStyleSize(width: number, height: number) {
    this.wrapElement.style.width = `${width}px`;
    this.wrapElement.style.height = `${height}px`;
  }
  setAttrSize(width: number, height: number) {
    this.wrapElement.width = width;
    this.wrapElement.height = height;
  }
  emitSubscribers(actor) {
    this.subscribers.forEach(subscriber => subscriber(actor))
  }
  subscribe(subscriber: Function) {
    this.subscribers.push(subscriber);
  }
  unSubscribe(subscriber: Function) {
    for (let i = 0; i < this.subscribers.length; i++) {
      let _subscriber: Function = this.subscribers[i];
      if (_subscriber === subscriber) {
        this.subscribers.splice(i, 1);
      }
    }
  }
}