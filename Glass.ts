import Event from './Event';

export default class Glass extends Event {
  subscribers: Function[] = [];
  extends: string = 'Glass';

  constructor(){
    super();
  }
  subscribe(targetGlass: Glass, subscriber: Function){
    targetGlass.subscribers.push(subscriber);
  }
  unSubscribe(targetGlass: Glass, subscriber: Function){
    for(let i = 0; i < targetGlass.subscribers.length; i++){
      let subscriber: Function = targetGlass.subscribers[i];
      if(subscriber === subscriber){
        targetGlass.subscribers.splice(i, 1);
      }
    }
  }
}