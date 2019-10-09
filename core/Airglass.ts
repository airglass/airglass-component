import Glass from './Glass';
import Renderer from './Renderer';
import RendererManager from './RendererManager';
import Scene from './Scene';

export default class Airglass extends Glass {
  rendererManager: RendererManager;

  constructor(glass: HTMLDivElement) {
    super(glass);
    this.rendererManager = new RendererManager(glass);
    this._eventHandler = this._eventHandler.bind(this);
  }
  getScrollOffsets() {
    let w = window;
    return {
      x: w.pageXOffset,
      y: w.pageYOffset,
    }
  }
  getViewportSize() {
    let w = window;
    return {
      x: w.innerWidth,
      y: w.innerHeight,
    }
  }
  getBoundingClientRect(){
    let _ = this.glass.getBoundingClientRect();
    return {
      x: _.left,
      y: _.top,
      width: _.width || (_.right - _.left),
      height: _.height || (_.bottom - _.top)
    }
  }
  addGlass(name) {
    let renderer = new Renderer(
      document.createElement('canvas').getContext('2d'),
      new Scene()
    );
    this.glass.appendChild(renderer.ctx.canvas);
    return this.rendererManager.add(renderer)[0];
  }
  setInteractable() {
    let galss = this.glass;
    galss.addEventListener('mousedown', this._eventHandler);
    galss.addEventListener('touchstart', this._eventHandler);
    galss.addEventListener('mousemove', this._eventHandler);
    galss.addEventListener('touchmove', this._eventHandler);
    galss.addEventListener('mouseup', this._eventHandler);
    galss.addEventListener('touchend', this._eventHandler);
    return this;
  }
  offInteractable() {
    let galss = this.glass;
    galss.removeEventListener('mousedown', this._eventHandler);
    galss.removeEventListener('touchstart', this._eventHandler);
    galss.removeEventListener('mousemove', this._eventHandler);
    galss.removeEventListener('touchmove', this._eventHandler);
    galss.removeEventListener('mouseup', this._eventHandler);
    galss.removeEventListener('touchend', this._eventHandler);
    return this;
  }
  _eventHandler(e: any) {
    e.preventDefault();
    this.event = { extends: this.extends };
    let touch = e.touches && e.touches[0];
    switch (e.type) {
      case 'mousedown':
        this.isMouseDown = true;
        this.event.type = 'touchstart';
        this.event.x = e.layerX * devicePixelRatio;
        this.event.y = e.layerY * devicePixelRatio;
        break;
      case 'touchstart':
        this.event.type = 'touchstart';
        this.event.x = touch.clientX * devicePixelRatio;
        this.event.y = touch.clientY * devicePixelRatio;
        break;
      case 'mousemove':
        this.event.type = 'mousemove';
        if (this.isMouseDown) {
          this.event.type = 'touchmove';
        }
        this.event.x = e.layerX * devicePixelRatio;
        this.event.y = e.layerY * devicePixelRatio;
        break;
      case 'touchmove':
        this.event.type = 'touchmove';
        this.event.x = touch.clientX * devicePixelRatio;
        this.event.y = touch.clientY * devicePixelRatio;
        break;
      case 'mouseup':
        this.isMouseDown = false;
        this.event.type = 'touchend';
        break
      case 'touchend':
        this.event.type = 'touchend';
        break
    }
    this.emitSubscribers(this.event);
  }
}