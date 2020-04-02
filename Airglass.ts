import Glass from './Glass';
import Renderer from './Renderer';
import Group from './Group';

export default class Airglass extends Glass {
  rendererManager: Group;
  bounds: any;
  width: number;
  height: number;

  constructor(params) {
    super(params);
    this.width = params.width || 300;
    this.height = params.height || 150;
    this.rendererManager = new Group();
    this._eventHandler = this._eventHandler.bind(this);

    this.element.style.position = 'relative';
    this.setStyleSize(this.width, this.height);
    this.bounds = this.getBounds();

    this._setInteractable();
  }
  getScrollOffsets() {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    }
  }
  getViewportSize() {
    let w = window;
    return {
      x: w.innerWidth,
      y: w.innerHeight,
    }
  }
  getBounds() {
    let bcr = this.element.getBoundingClientRect();
    let x = bcr.left;
    let y = bcr.top;
    let width = bcr.width || (bcr.right - bcr.left);
    let height = bcr.height || (bcr.bottom - bcr.top);
    let centerX = x + width/2;
    let centerY = y + height/2;
    return this.bounds = {x, y, centerX, centerY, width, height};
  }
  addRenderer(rendererName): Renderer {
    let canvas = document.createElement('canvas')
    let renderer = new Renderer({
      element: canvas,
      DPR: this.DPR
    });
    renderer.setSize(this.bounds.width, this.bounds.height);
    renderer.name = rendererName;
    this.element.appendChild(canvas);
    return this.rendererManager.add(renderer)[0];
  }
  _setInteractable() {
    let el = this.element;
    el.addEventListener('mousedown', this._eventHandler);
    el.addEventListener('touchstart', this._eventHandler);
    el.addEventListener('mousemove', this._eventHandler);
    el.addEventListener('touchmove', this._eventHandler);
    el.addEventListener('mouseup', this._eventHandler);
    el.addEventListener('touchend', this._eventHandler);
    el.addEventListener('mouseover', this._eventHandler);
    el.addEventListener('mouseout', this._eventHandler);
    return this;
  }
  _eventHandler(e: any) {
    this.event = {};
    let touch = e.touches && e.touches[0];
    switch (e.type) {
      case 'mousedown':
        this.event.interactor = 'mouse';
        this.isMouseDown = true;
        this.event.type = 'touchstart';
        this.event.x = e.layerX * this.DPR;
        this.event.y = e.layerY * this.DPR;
        break;
      case 'touchstart':
        this.event.interactor = 'finger';
        this.event.type = 'touchstart';
        this.event.x = (touch.clientX - this.bounds.x) * this.DPR;
        this.event.y = (touch.clientY - this.bounds.y) * this.DPR;
        break;
      case 'mousemove':
        this.event.interactor = 'mouse';
        this.event.type = 'mousemove';
        if (this.isMouseDown) {
          this.event.type = 'touchmove';
        }
        this.event.x = e.layerX * this.DPR;
        this.event.y = e.layerY * this.DPR;
        break;
      case 'touchmove':
        this.event.interactor = 'finger';
        this.event.type = 'touchmove';
        this.event.x = (touch.clientX - this.bounds.x) * this.DPR;
        this.event.y = (touch.clientY - this.bounds.y) * this.DPR;
        break;
      case 'mouseup':
        this.event.interactor = 'mouse';
        this.isMouseDown = false;
        this.event.type = 'touchend';
        break
      case 'touchend':
        this.event.interactor = 'finger';
        this.event.type = 'touchend';
      case 'mouseover':
        this.event.interactor = 'mouse';
        this.event.type = 'mouseover';
        break;
      case 'mouseout':
        this.event.interactor = 'mouse';
        this.event.type = 'mouseout';
        break
    }
    this.emitSubscribers(this.event, e);
  }
}