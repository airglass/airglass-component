import Glass from './Glass';
import Renderer from './Renderer';
import RendererManager from './RendererManager';
import Scene from './Scene';

export default class Airglass extends Glass {
  rendererManager: RendererManager;

  constructor(glass: HTMLDivElement) {
    super(glass);
    this.rendererManager = new RendererManager(glass);
    this.eventHandler = this.eventHandler.bind(this);
  }
  addGlass() {
    let canvas: HTMLCanvasElement = document.createElement('canvas');
    this.glass.appendChild(canvas);
    let renderer = new Renderer(
      canvas.getContext('2d'),
      new Scene()
    );
    return this.rendererManager.add(renderer)[0];
  }
  clearnAll() {

  }
  renderAll() {

  }
  setInteractable() {
    let galss = this.glass;
    galss.addEventListener('mousedown', this.eventHandler);
    galss.addEventListener('touchstart', this.eventHandler);
    galss.addEventListener('mousemove', this.eventHandler);
    galss.addEventListener('touchmove', this.eventHandler);
    galss.addEventListener('mouseup', this.eventHandler);
    galss.addEventListener('touchend', this.eventHandler);
    return this;
  }
  offInteractable() {
    let galss = this.glass;
    galss.removeEventListener('mousedown', this.eventHandler);
    galss.removeEventListener('touchstart', this.eventHandler);
    galss.removeEventListener('mousemove', this.eventHandler);
    galss.removeEventListener('touchmove', this.eventHandler);
    galss.removeEventListener('mouseup', this.eventHandler);
    galss.removeEventListener('touchend', this.eventHandler);
    return this;
  }
  eventHandler(e: any) {
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
    this.emitSubscribers(this);
  }
}