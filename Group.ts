export default class Group {
  children: any = [];

  constructor(){}
  add(child: any){
    this.children.push(child);
  }
  remove(child: any){
    for(let i in this.children){
      if(child === this.children[i]){
        this.children.splice(i, 1);
      }
    }
  }
}