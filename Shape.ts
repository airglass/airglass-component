import Element from './Element';

// 有形的继承无形的
export default class Shape extends Element {
  // 有形的轮廓路径
  path;

  // 有形的就有确定的位置
  x: number = 0;
  y: number = 0;
  
  // 有形的就颜色
  fillStyle: string = 'hsla(0, 0%, 100%, .5)';
  strokeStyle: string = '#fff';
  lineWidth: number = 2;
  
  constructor(opts?){
    super();
    this.set(opts);

    let isMouseDown = false;
     
    // 在元素内按下鼠标
    this.on('mousedown', (e, renderer) => {
      isMouseDown = true;

      this.event = {
        type: 'touchstart',
        extends: this.extends,  
        x: e.layerX * devicePixelRatio,
        y: e.layerY * devicePixelRatio,
      }
    })

    // 在元素内移动鼠标
    this.on('mousemove', e => {
      // 在元素内移动鼠标
      this.event = {
        type: 'mousemove',
        extends: this.extends,
        x: e.layerX * devicePixelRatio,
        y: e.layerY * devicePixelRatio,
      };

      // 在元素内按下并移动鼠标
      if(isMouseDown){
        this.event = {
          type: 'touchmove',
          extends: this.extends,
          x: e.layerX * devicePixelRatio,
          y: e.layerY * devicePixelRatio,
        };
      }
    })

    // 在元素内抬起鼠标
    this.on('mouseup', e => {
      isMouseDown = false;

      this.event = {
        type: 'touchend',
        extends: this.extends,
        x: e.layerX * devicePixelRatio,
        y: e.layerY * devicePixelRatio,
      };
    })
  }
}