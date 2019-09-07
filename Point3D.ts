import Point from './Point';

export default class Point3D extends Point {
  z: number;

  constructor(x:number, y:number, z:number){
    super(x, y);
    this.z = z || 0;
  }
}