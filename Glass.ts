import Event from './Event';

export default class Glass extends Event {
  subscribers: Function[];
  extends: string = 'Glass';

  constructor(){
    super();

    this.subscribers = [];
  }
  subscribe(targetGlass: Glass, subscriber: Function){
    targetGlass.subscribers.push(subscriber);
  }
  unSubscribe(targetGlass: Glass, subscriber: Function){
    for(let i = 0; i < targetGlass.subscribers.length; i++){
      let _subscriber: Function = targetGlass.subscribers[i];
      if(_subscriber === subscriber){
        targetGlass.subscribers.splice(i, 1);
      }
    }
  }
}