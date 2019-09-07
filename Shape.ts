export default class Shape {
  subscribers:any = [];
  hitPath;
  drawPath;
  _eventListeners = {};
  _isMouseDown = false;
  _ShapePositionWhenMouseDown = {};
  _mouseDownPoint = {};

  constructor(){}
  set(opts){
    for(let optName in opts){
      this[optName] = opts[optName];
    }
  }
  on(eventName, handler){
    if(!this._eventListeners[eventName]) this._eventListeners[eventName] = [];
    this._eventListeners[eventName].push(handler.bind(this));
  }
}