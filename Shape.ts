import Element from './Element';

// 有形的继承无形的
export default class Shape extends Element {
  // 勾勒有形的形状
  _drawPath;
  
  // 有形的形状的感知区域
  _hitPath;

  // 有形的就有确定的位置
  x: number = 0;
  y: number = 0;
  
  // 有形的就颜色
  fillStyle: string = '#999';
  strokeStyle: string = '#333';
  
  constructor(opts){
    super();
    this.set(opts);
    
    this.on('mousedown', (e, renderer) => {
      this.event = {
        type: 'touchstart',
      }
    })
    this.on('mousemove', e => {
      this.event = {
        type: 'mousemove',
      };
    })
    this.on('mouseup', e => {
      this.event = {
        type: 'touchend',
      };
    })
  }
}