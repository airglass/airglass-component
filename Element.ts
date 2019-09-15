import Event from './Event';

interface EventListener {
  // 监听的事件类型
  eventType: string;
  listener: Function;
}

export default class Element extends Event {
  // 全部事件监听器
  _eventListeners: EventListener[] = [];
  extends: string = 'Element';
  path: Path2D = new Path2D;
  
  constructor(opts?: any){
    super();
    this.set(opts);
  }
  // 只能监听 mousedown | mousemove | mouseup
  on(type: string, listener: Function){
    let eventListener: EventListener = {
      eventType: type,
      listener: listener
    };
    this._eventListeners.push(eventListener);
  }
  off(type: string, listener: Function){
    for(let i=0; i<this._eventListeners.length; i++){
      let currentListener: EventListener = this._eventListeners[i];
      if(currentListener.eventType === type && currentListener.listener === listener){
        return this._eventListeners.splice(i, 1);
      }
    }
  }
  // 释放
  destroy(){}
  set(opts: any){
    if(!opts) return;
    for(let optName in opts){
      this[optName] = opts[optName];
    }
  }
}