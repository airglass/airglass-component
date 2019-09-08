interface EventListener {
  // 监听的事件类型
  eventType: String;
  listener: Function;
}

// 无形的也能感知事件
export default class Element {
  // 全部事件监听器
  _eventListeners: EventListener[] = [];

  constructor(){}
  on(type: string, listener: Function){
    let eventListener: EventListener = {
      eventType: type,
      listener: listener
    };
    this._eventListeners.push(eventListener);
  }
}