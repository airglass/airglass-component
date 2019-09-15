import Glass from './Glass';
import Point from './Point';
import Scene from './Scene';
import Element from './Element';

export default class Renderer extends Glass {
  _isMouseDown: boolean = false;

  constructor(
    public ctx: CanvasRenderingContext2D,
    public scene: Scene){
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
    return this;
  }
  offInteractable(){
    let canvas: HTMLCanvasElement = this.ctx.canvas;
    canvas.removeEventListener('mousedown', this._eventListener);
    canvas.removeEventListener('mousemove', this._eventListener);
    canvas.removeEventListener('mouseup', this._eventListener);
    return this;
  }
  clean(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    return this;
  }
  // 触发所有订阅了渲染器事件的事件处理器
  // 包括原生事件 && 选中、删除元素等非原生合成事件
  // actor指触发事件的演员
  _emitSubscribers(actor: Element | Glass){
    this.subscribers.forEach(subscriber => subscriber(actor))
  }
  _eventListener(e: any){

    this.event = {
      extends: this.extends,
      x: e.layerX * devicePixelRatio,
      y: e.layerY * devicePixelRatio,
    };

    switch(e.type){
      case 'mousedown':
        this._isMouseDown = true;
        this.event.type = 'touchstart';
        break;
      case 'mousemove':
        this.event.type = 'mousemove';
        if(this._isMouseDown){
          this.event.type = 'touchmove';
        }
        break;
      case 'mouseup':
        this._isMouseDown = false;
        this.event.type = 'touchend';
        break
    }
    // 全部是画布触发的事件
    this._emitSubscribers(this);
    // 触发可以绑定在canvas上的事件处理器，如鼠标事件
    this._eventCallback(this._hit(e));
  }
  _eventCallback(listenersSaid: any){
    if(!listenersSaid) return;

    // 有话要说的监听器的数量
    let listenersSaidCount = listenersSaid.length;

    // 如果没有有话要交代的监听器就直接返回
    if(listenersSaidCount == 0) return;

    // 默认不渲染
    let needRender = false;

    // 遍历所有有话要交到的渲染器，这些有话要说的监听器都是最上层的元素触发的
    listenersSaid.forEach(listenerSaid => {
      console.log(listenerSaid)
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
  getElementsContainPoint(point: Point){
    return this.scene.children.map(interactableChild => {
      let isPointInPath = this.ctx.isPointInPath(interactableChild.path, point.x, point.y);
      if(isPointInPath){
        return interactableChild;
      }
      return;
    }).filter(containPointElement => containPointElement);
  }
  // _hit只用来批量触发元素们的鼠标和触摸事件
  // 其他事件需要用订阅的手段订阅元素特定事件比如添加到场景中的事件/移除场景的事件等。
  _hit(e){
    // 当前事件类型
    let currentEventType = e.type;

    // 遍历出所有支持交互的元素
    // 默认所有元素都支持交互
    let supportedInteractionChildren = this.scene.children.map(interactableChild => {
      // 用来存储监听当前元素当前事件类型的全部事件处理器
      let listeners: any;

      // 检测当前鼠标是否落在每一个可交互的元素内
      let isPointInPath = this.ctx.isPointInPath(interactableChild.path, e.layerX * devicePixelRatio, e.layerY * devicePixelRatio);
      
      if(isPointInPath){
        // 遍历出所有支持交互 && 鼠标落在元素绘制路径内 && 元素包含监听当前事件的事件处理器
        listeners = interactableChild._eventListeners.filter(eventListener => {
          return eventListener.eventType === currentEventType;
        });
      }
      // 返回需要交互的元素
      return {
        // 当前元素
        instance: interactableChild,
        // 当前事件类型
        eventType: currentEventType,
        // 有可能是空数组，因为鼠标没有落在该元素内 || 没有检测到监听该元素当前事件类型的事件处理器
        // 所以需要继续过滤掉空数组
        listeners: listeners,
      };
    });

    // 过滤掉没有被监听当前事件类型的元素
    // 最终得到那些需要触发当前事件类型的事件处理器的元素
    let needEmitListenerChildren = supportedInteractionChildren.filter(child => child.listeners.length)

    // 需要触发当前事件的元素数量
    let length = needEmitListenerChildren.length;

    // 有可能不存在满足条件（支持交互 && 鼠标落在元素绘制路径内 && 有监听该元素当前事件类型的事件处理器）的元素
    // 直接返回
    if(!length) return;

    // 继续过滤出顶层元素
    // 按加入到场景中的顺序获取最后一个元素，也就是最上层的元素
    // 满足条件的元素数量减去1，就能得到顶层元素
    let topChild = needEmitListenerChildren[length-1];

    // 执行监听了最顶层元素的当前事件类型的全部事件处理器
    // 得到所有事件监听器返回的诉求
    let listenersSaid = topChild.listeners.map((listener: any) => {
      // 事件处理器当然也可以什么都不返回
      // 所以下面需要过滤出有诉求的事件监听器
      let said = listener.listener(
        // 原生事件
        e,
        //当前渲染器
        this,
        // 其他帮助事件处理函数做出判断的信息
        {
          supportedInteractionChildren,
          needEmitListenerChildren
        }
      );
      return said;
    }).filter(listenerSaid => listenerSaid);

    // 触发事件订阅者的订阅处理器
    this._emitSubscribers(topChild.instance)

    // 返回监听器的诉求
    // 可能都没有诉求，返回的事空数组 []
    return listenersSaid
  }
}