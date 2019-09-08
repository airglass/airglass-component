export default class Renderer {
  constructor(public ctx, public scene){
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
  _eventListener(e){
    this._eventCallback(this._hit(e));
  }
  _eventCallback(needInteractChildren){
    if(!needInteractChildren) return;
    let needInteractChildrenLength = needInteractChildren.length;

    // 如果场景中没有需要交互的元素就直接返回
    if(needInteractChildrenLength == 0) return;

    // 默认不渲染
    let needRender = false;

    // 遍历所有需要交互的元素
    needInteractChildren.forEach(needInteractChild => {
      let listenerOpts = needInteractChild.listenerOpts;
      listenerOpts.some(listenerOpt => {
        // 谁最后设置该选项就听谁的
        needRender = listenerOpt.needRender;
      })
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

    // 遍历出所有需要触发交互的元素
    let needEmitListenerChildren = interactableChildren.map(interactableChild => {
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
    }).filter(needInteractChild => {
      return needInteractChild.listeners.length !== 0
    });

    console.log(needEmitListenerChildren)

    // 返回所有事件监听器的返回值的集合
    // listenerOpts = eventListeners.map(eventListener => {
      // let opts = eventListener.listener(e, this.scene);
      // 一般listener都会返回undefined，所以需要过滤出有效的opt
      // return opts;
    // }).filter(listenerOpt => listenerOpt);

    return

    return needInteractChildren;
  }
}