import Element from './Element';

export default class Group {
  children: Array<any>;

  constructor() {
    this.children = [];
  }
  add(child: any) {
    let children: Array<any> = [].slice.call(arguments, 0);
    children.forEach((child: Element) => {
      this.children.push(child);
    })
    return children;
  }
  getChildByIndex(index){
    return this.children[index];
  }
  getIndexByChild(child){
    return this.children.indexOf(child);
  }
  remove(child: any) {
    for (let i in this.children) {
      if (child === this.children[i]) {
        return this.children.splice(+i, 1)[0]
      }
    }
  }
  removeAll(){
    this.children = [];
  }
}