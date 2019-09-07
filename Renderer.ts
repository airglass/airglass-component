export default class Renderer {
  renderRequest = 0;
  subscribers:any = [];

  constructor(public ctx, public scene){
    if(!ctx) throw new Error('need CanvasRenderingContext2D');
    if(!scene) throw new Error('need Scene');
    let canvas = this.ctx.canvas;
    canvas.addEventListener('mousedown', e => {
      for(let subscriber of this.subscribers){
        if(subscriber.eventName === 'mousedown'){
          subscriber.func(this, e);
        }
      }
      this.checkIsNeedRender(this.hit(e));
    })
    canvas.addEventListener('mousemove', e => {
      for(let subscriber of this.subscribers){
        if(subscriber.eventName === 'mousemove'){
          subscriber.func(this, e);
        }
      }
      this.checkIsNeedRender(this.hit(e));
    })
    canvas.addEventListener('mouseup', e => {
      for(let subscriber of this.subscribers){
        if(subscriber.eventName === 'mouseup'){
          subscriber.func(this, e);
        }
      }
      this.checkIsNeedRender(this.hit(e));
    })
  }
  checkIsNeedRender(opts){
    if(!opts) return;
    if(opts.needRender){
      this.renderRequest++;
    }
    if(this.renderRequest > 0){
      this.render();
      this.renderRequest--;
    }
  }
  render(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for(let child of this.scene.children){
      child.draw && child.draw(this.ctx);
    }
  }
  hit(e: any){
    let eventName = e.type;
    let children = Array.prototype.slice.call(this.scene.children).reverse();
    for(let child of children){
      let eventHandlers = child._eventListeners && child._eventListeners[eventName];
      if(eventHandlers && eventHandlers.length){
        let isPointInPath = this.ctx.isPointInPath(child.getHitPath(), e.layerX, e.layerY);
        if(isPointInPath){
          for(let eventHandler of eventHandlers){
            return eventHandler(e, this.scene, this);
          }
        }
      }
    }
  }
}