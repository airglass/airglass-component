import Event from './Event';

export default class Glass extends Event {
  subscribers: Function[];
  extends: string = 'Glass';
  isMouseDown: boolean = false;

  constructor(public glass: HTMLDivElement | HTMLCanvasElement) {
    super();
    this.subscribers = [];
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