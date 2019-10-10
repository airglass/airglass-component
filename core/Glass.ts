import Event from './Event';

export default class Glass extends Event {
  subscribers: Function[];
  extends: string = 'Glass';
  isMouseDown: boolean = false;

  constructor(public glass: any) {
    super();
    this.subscribers = [];
  }
  setStyleSize(width: number, height: number) {
    this.glass.style.width = `${width}px`;
    this.glass.style.height = `${height}px`;
  }
  setAttrSize(width: number, height: number) {
    this.glass.width = width * window.devicePixelRatio;
    this.glass.height = height * window.devicePixelRatio;
  }
  emitSubscribers(actor: Element | Glass) {
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