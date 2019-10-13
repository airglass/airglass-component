import Renderable from './Renderable';

interface EventListener {
  eventType: string;
  listener: Function;
}

export default class Interactable extends Renderable {
  path: Path2D;
  event: any;
  eventListeners: Array<EventListener>;

  constructor(params){
    super(params);
    this.path = new Path2D;
    this.event = {};
    this.eventListeners = [];
  }
  on(eventType: string, eventListener: Function) {
    this.eventListeners.push({
      eventType: eventType,
      listener: eventListener
    });
  }
  off(eventType: string, eventListener: Function) {
    for (let i = 0; i < this.eventListeners.length; i++) {
      if (this.eventListeners[i].eventType === eventType && this.eventListeners[i].listener === eventListener) {
        return this.eventListeners.splice(i, 1);
      }
    }
  }
}