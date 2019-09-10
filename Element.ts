import Event from './Event';

interface EventListener {
  // 监听的事件类型
  eventType: String;
  listener: Function;
}

// 无形的也能感知事件
export default class Element extends Event {
  // 全部事件监听器
  _eventListeners: EventListener[] = [];

  extends: string = 'Element';

  constructor(){
    super();
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
      let currentListener = this._eventListeners[i];
      if(currentListener.eventType === type && currentListener.listener === listener){
        return this._eventListeners.splice(i, 1);
      }
    }
  }
  // 移除元素
  // 释放资源
  destroy(){

  }
}