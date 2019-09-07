import Shape from './Shape';

export default class DraggableShape extends Shape {
  constructor(){
    super();
    this.on('mousedown', function(e, scene){
      this.checkSubscribe(e);

      for(let i in scene.children){
        let child = scene.children[i]
        if(child === this){
          child = scene.children.splice(i, 1)[0];
          scene.children.push(child);
        }
      }
      this.isMouseDown = true;
      this._ShapePositionWhenMouseDown.x = this.x;
      this._ShapePositionWhenMouseDown.y = this.y;
      this._mouseDownPoint.x = e.layerX;
      this._mouseDownPoint.y = e.layerY;
      return {
        needRender: true
      }
    })
    this.on('mousemove', function(e){
      this.checkSubscribe(e);

      if(this.isMouseDown){
        this.x = this._ShapePositionWhenMouseDown.x + e.layerX - this._mouseDownPoint.x;
        this.y = this._ShapePositionWhenMouseDown.y + e.layerY - this._mouseDownPoint.y;
        this.updateDrawPath();
        this.updateHitPath();
        return {
          needRender: true,
        };
      }
    })
    this.on('mouseup', function(e){
      this.checkSubscribe(e);

      this.isMouseDown = false;
      this._ShapePositionWhenMouseDown = {};
      this._mouseDownPoint = {};
    })
  }
  checkSubscribe(e){
    for(let subscriber of this.subscribers){
      if(subscriber.eventName === e.type){
        subscriber.func(e);
      }
    }
  }
}