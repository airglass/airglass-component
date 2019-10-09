import Element from './Element';

export default class Group {
  children: Array<any>;

  constructor() {
    this.children = [];
  }
  add() {
    let children: Array<any> = [].slice.call(arguments, 0);
    children.forEach((child: Element) => {
      this.children.push(child);
    })
    return children;
  }
  remove(child: any) {
    for (let i in this.children) {
      if (child === this.children[i]) {
        return this.children.splice(+i, 1);
      }
    }
  }
  removeAll(){
    this.children = [];
  }
}