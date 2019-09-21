import Element from './Element';

export default class Group {
  children: Array<any>;

  constructor(){
    this.children = [];
  }
  // 可以一次性添加多个
  add(){
    let children: Array<any> = [].slice.call(arguments, 0);
    children.forEach((child: Element) => {
      this.children.push(child);
    })
  }
  remove(child: any){
    for(let i in this.children){
      if(child === this.children[i]){
        this.children.splice(+i, 1);
      }
    }
  }
}