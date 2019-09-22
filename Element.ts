import Event from './Event';

interface EventListener {
  // 监听的事件类型
  eventType: string;
  listener: Function;
}

export default class Element extends Event {
  // 全部事件监听器
  eventListeners: EventListener[];
  extends: string;
  path: Path2D;
  
  constructor(opts: any){
    super();
    this.set(opts);
    this.eventListeners = [];
    this.extends = 'Element';
    this.path = new Path2D;
  }
  on(type: string, listener: Function){
    let eventListener: EventListener = {
      eventType: type,
      listener: listener
    };
    this.eventListeners.push(eventListener);
  }
  off(type: string, listener: Function){
    for(let i=0; i<this.eventListeners.length; i++){
      let currentListener: EventListener = this.eventListeners[i];
      if(currentListener.eventType === type && currentListener.listener === listener){
        return this.eventListeners.splice(i, 1);
      }
    }
  }
  destroy(){}
  draw(ctx: CanvasRenderingContext2D){}
  set(opts: any){
    if(!opts) return;
    for(let optName in opts){
      this[optName] = opts[optName];
    }
  }
}