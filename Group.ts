export default class Group {
  children:any = [];

  constructor(){}
  // 可以一次性添加多个
  add(){
    let children = [].slice.call(arguments, 0);
    children.forEach(child => {
      this.children.push(child);
    })
  }
  remove(child){
    for(let i in this.children){
      if(child === this.children[i]){
        this.children.splice(i, 1);
      }
    }
  }
}