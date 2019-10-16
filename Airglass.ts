import Glass from './Glass';
import Renderer from './Renderer';
import RendererManager from './RendererManager';
import { Bounds } from './Renderable';

export default class Airglass extends Glass {
  rendererManager: RendererManager;

  constructor(public wrapElement: HTMLDivElement, width: number, height: number) {
    super(wrapElement);
    this.rendererManager = new RendererManager(wrapElement);
    this._eventHandler = this._eventHandler.bind(this);

    this.wrapElement.style.position = 'relative';
    this.setStyleSize(width, height);
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
  getBounds(): Bounds {
    let bcr = this.wrapElement.getBoundingClientRect();
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
    let renderer = new Renderer(canvas.getContext('2d'));
    renderer.setSize(this.bounds.width, this.bounds.height);
    renderer.name = rendererName;
    this.wrapElement.appendChild(canvas);
    return this.rendererManager.add(renderer)[0];
  }
  _setInteractable() {
    let el = this.wrapElement;
    el.addEventListener('mousedown', this._eventHandler);
    el.addEventListener('touchstart', this._eventHandler);
    el.addEventListener('mousemove', this._eventHandler);
    el.addEventListener('touchmove', this._eventHandler);
    el.addEventListener('mouseup', this._eventHandler);
    el.addEventListener('touchend', this._eventHandler);
    return this;
  }
  _eventHandler(e: any) {
    e.preventDefault();
    this.event = {};
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
        this.event.x = (touch.clientX - this.bounds.x) * devicePixelRatio;
        this.event.y = (touch.clientY - this.bounds.y) * devicePixelRatio;
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
        this.event.x = (touch.clientX - this.bounds.x) * devicePixelRatio;
        this.event.y = (touch.clientY - this.bounds.y) * devicePixelRatio;
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