import Element from './Element';

// 有形的继承无形的
export default class Shape extends Element {
  // 勾勒有形的形状
  _drawPath;
  
  // 有形的形状的感知区域
  _hitPath;

  // 是否可交互
  interactable: boolean = false;
  
  // 有形的就有确定的位置
  x: number = 0;
  y: number = 0;
  
  // 有形的就颜色
  fillStyle: string = '#444';
  
  constructor(opts){
    super();
    this.set(opts)
  }
  updateDrawPath(){}
  updateHitPath(){}
  // 先设置可交互性，再执行该方法才可拖拽
  // 因为交互有很多种，拖拽是其中一种。可交互性控制所有交互行为
  setDraggable(opts){
    if(!this.interactable) return;

    let _isMouseDown;
    let _ShapePositionWhenMouseDown;
    let _mouseDownPoint;
    
    // 是否在mousedown时将元素置于最顶层
    let setToTop = opts && opts.setToTop || true;
    this.on('mousedown', (e, scene) => {
      // 是否将形状置于最顶层
      if(setToTop){
        for(let i in scene.children){
          let child = scene.children[i];
          if(child === this){
            child = scene.children.splice(i, 1)[0];
            scene.children.push(child);
          }
        }
      }
      
      // 鼠标已经按下
      _isMouseDown = true;
      
      // 记录鼠标按下时形状的坐标
      _ShapePositionWhenMouseDown = {
        x: this.x,
        y: this.y
      };
      
      // 记录鼠标按下时的鼠标坐标
      _mouseDownPoint = {
        x: e.layerX,
        y: e.layerY
      }

      return {
        // 是否需要重新渲染
        // 如果需要在按下鼠标时将元素置于顶层，则需要更新渲染
        needRender: setToTop
      }
    })
    this.on('mousemove', e => {
      if(_isMouseDown){
        // 更新形状位置坐标
        this.x = _ShapePositionWhenMouseDown.x + e.layerX - _mouseDownPoint.x;
        this.y = _ShapePositionWhenMouseDown.y + e.layerY - _mouseDownPoint.y;

        // 更新形状感知事件的区域
        this.updateHitPath();

        // 更新形状绘制路径
        this.updateDrawPath();

        // Renderer实例的hit方法会接受并返回对象
        return {
          // 拖动形状时需要实时更新渲染
          needRender: true,
        };
      }
    })
    this.on('mouseup', e => {
      // 释放鼠标后更新状态
      _isMouseDown = false;
    })
  }
}