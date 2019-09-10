import Rect from './Rect';

export default class Module extends Rect {
  constructor(opts){
    super();
    opts && this.set(opts);
  }
}