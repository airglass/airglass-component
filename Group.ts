export default class Group {
  children: Array<any>;
  constructor() {
    this.children = [];
  }
  add(child?) {
    let children: Array<any> = [].slice.call(arguments, 0);
    children.forEach((child) => {
      this.children.push(child);
    })
    return children;
  }
  remove(child: any) {
    for (let i in this.children) {
      if (child === this.children[i]) {
        return this.children.splice(+i, 1)[0]
      }
    }
  }
}