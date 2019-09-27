import Element from './Element';
import Renderer from './Renderer';

export default class Shape extends Element {
  x: number;
  y: number;
  fill: any;
  stroke: any;
  line: number;
  isMouseDown: boolean;
  
  constructor(opts: any){
    super(opts);

    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.fill = opts.fill || '#eee';
    this.stroke = opts.stroke || '#111';
    this.line = opts.line || devicePixelRatio;
    this.isMouseDown = false;
    
    this.on('mousedown', (e: any, renderer: Renderer) => {
      this.isMouseDown = true;
      this.event = {
        type: 'touchstart',
        extends: this.extends,
        x: e.layerX * devicePixelRatio,
        y: e.layerY * devicePixelRatio,
      }
    })

    this.on('mousemove', (e: any) => {
      this.event = {
        type: 'mousemove',
        extends: this.extends,
        x: e.layerX * devicePixelRatio,
        y: e.layerY * devicePixelRatio,
      };

      if (this.isMouseDown){
        this.event = {
          type: 'touchmove',
          extends: this.extends,
          x: e.layerX * devicePixelRatio,
          y: e.layerY * devicePixelRatio,
        };
      }
    })

    this.on('mouseup', (e: any) => {
      this.isMouseDown = false;
      this.event = {
        type: 'touchend',
        extends: this.extends,
        x: e.layerX * devicePixelRatio,
        y: e.layerY * devicePixelRatio,
      };
    })
  }
}