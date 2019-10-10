import Glass from './Glass';
import Renderer from './Renderer';
import RendererManager from './RendererManager';
import Scene from './Scene';

export default class Airglass extends Glass {
  rendererManager: RendererManager;
  boundingClientRect: any;

  constructor(glass: HTMLDivElement) {
    super(glass);
    this.rendererManager = new RendererManager(glass);
    this._eventHandler = this._eventHandler.bind(this);

  }
  initSize(width: number, height: number) {
    this.glass.style.position = 'relative';
    this.setStyleSize(width, height);
    this.rendererManager.setAllSize(width, height);

    this.updateBoundingClientRect();
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
  getBoundingClientRect() {
    let _ = this.glass.getBoundingClientRect();
    return {
      x: _.left,
      y: _.top,
      width: _.width || (_.right - _.left),
      height: _.height || (_.bottom - _.top)
    }
  }
  updateBoundingClientRect() {
    this.boundingClientRect = this.getBoundingClientRect();
  }
  addRenderer(rendererName): Renderer {
    let renderer = new Renderer(
      document.createElement('canvas').getContext('2d'),
      new Scene()
    );
    renderer.name = rendererName;
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
        this.event.interactor = 'mouse';
        this.isMouseDown = true;
        this.event.type = 'touchstart';
        this.event.x = e.layerX * devicePixelRatio;
        this.event.y = e.layerY * devicePixelRatio;
        break;
      case 'touchstart':
        this.event.interactor = 'finger';
        this.event.type = 'touchstart';
        this.event.x = (touch.clientX - this.boundingClientRect.x) * devicePixelRatio;
        this.event.y = (touch.clientY - this.boundingClientRect.y) * devicePixelRatio;
        console.log(this.event)
        break;
      case 'mousemove':
        this.event.interactor = 'mouse';
        this.event.type = 'mousemove';
        if (this.isMouseDown) {
          this.event.type = 'touchmove';
        }
        this.event.x = e.layerX * devicePixelRatio;
        this.event.y = e.layerY * devicePixelRatio;
        break;
      case 'touchmove':
        this.event.interactor = 'finger';
        this.event.type = 'touchmove';
        this.event.x = (touch.clientX - this.boundingClientRect.x) * devicePixelRatio;
        this.event.y = (touch.clientY - this.boundingClientRect.y) * devicePixelRatio;
        break;
      case 'mouseup':
        this.event.interactor = 'mouse';
        this.isMouseDown = false;
        this.event.type = 'touchend';
        break
      case 'touchend':
        this.event.interactor = 'finger';
        this.event.type = 'touchend';
        break
    }
    this.emitSubscribers(this.event);
  }
}