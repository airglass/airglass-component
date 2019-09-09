import Glass from './Glass';

export default class Renderer extends Glass {
  constructor(public ctx, public scene){
    super();
    if(!ctx) throw new Error('need CanvasRenderingContext2D');
    if(!scene) throw new Error('need Scene');
    this._eventListener = this._eventListener.bind(this);
  }
  // mousedown/mousemove/mouseup
  setInteractable(){
    let canvas = this.ctx.canvas;
    canvas.addEventListener('mousedown', this._eventListener);
    canvas.addEventListener('mousemove', this._eventListener);
    canvas.addEventListener('mouseup', this._eventListener);
  }
  offInteractable(){
    let canvas = this.ctx.canvas;
    canvas.removeEventListener('mousedown', this._eventListener);
    canvas.removeEventListener('mousemove', this._eventListener);
    canvas.removeEventListener('mouseup', this._eventListener);
  }
  // 触发所有订阅了渲染器事件的事件处理器
  // 包括原生事件 && 选中、删除元素等非原生合成事件
  _emitSubscribers(e){
    this.subscribers.forEach(subscriber => {
      let info = {
        eventName: e.type
      };
      subscriber(e, info)
    })
  }
  _eventListener(e){
    this._emitSubscribers(e);

    // 触发可以绑定在canvas上的事件处理器，如鼠标事件
    this._eventCallback(this._hit(e));
  }
  _eventCallback(listenersSaid){
    if(!listenersSaid) return;

    // 有话要说的监听器的数量
    let listenersSaidCount = listenersSaid.length;

    // 如果没有有话要交代的监听器就直接返回
    if(listenersSaidCount == 0) return;

    // 默认不渲染
    let needRender = false;

    // 遍历所有有话要交到的渲染器，这些有话要说的监听器都是最上层的元素触发的
    listenersSaid.forEach(listenerSaid => {
      needRender = listenerSaid.needRender;
    })

    // 是否需要渲染场景
    if(needRender){
      this.render();
    }
  }
  render(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for(let child of this.scene.children){
      child.draw && child.draw(this.ctx);
    }
  }
  // _hit只用来批量触发元素们的鼠标和触摸事件
  // 其他事件需要用订阅的手段订阅元素特定事件比如添加到场景中的事件/移除场景的事件等。
  _hit(e){
    let currentEventType = e.type;

    // 过滤出所有需要交互的元素
    let interactableChildren = this.scene.children.filter(child => child.interactable);

    // 遍历出所有支持交互的元素
    let supportedInteractionChildren = interactableChildren.map(interactableChild => {
      // 检测当前鼠标位置是否在
      let isPointInPath = this.ctx.isPointInPath(interactableChild.getHitPath(), e.layerX, e.layerY);
      let listenerOpts = [];
      let listeners = [];
      if(isPointInPath){
        // 遍历出所有包含当前事件类型的监听器
        listeners = interactableChild._eventListeners.filter(eventListener => {
          return eventListener.eventType === currentEventType;
        });
      }
      // 返回需要交互的元素
      return {
        instance: interactableChild,
        eventType: currentEventType,
        listeners: listeners
      };
    });

    // 遍历出所有需要触发交互事件处理函数的元素
    let needEmitListenerChildren = supportedInteractionChildren.filter(supportedInteractChild => {
      return supportedInteractChild.listeners.length !== 0
    })

    // 需要触发当前事件的元素数量
    let length = needEmitListenerChildren.length;

    if(!length) return

    // 按加入到场景中的顺序获取最后一个元素，即最上层的元素
    let topChild = needEmitListenerChildren[length-1];

    // 获取全部监听器的诉求，即交代一些事情
    let listenersSaid = topChild.listeners.map(listener => {
      let info = {
        supportedInteractionChildren,
        needEmitListenerChildren
      }
      return listener.listener(e, this.scene, info)
    }).filter(listenerSaid => listenerSaid);

    return listenersSaid
  }
}