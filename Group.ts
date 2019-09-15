import Element from './Element';

export default class Group {
  children: Array<Element> = [];

  constructor(){}
  // 可以一次性添加多个
  add(){
    let children: Array<Element> = [].slice.call(arguments, 0);
    children.forEach((child: Element) => {
      this.children.push(child);
    })
  }
  remove(child: Element){
    for(let i in this.children){
      if(child === this.children[i]){
        this.children.splice(+i, 1);
      }
    }
  }
}