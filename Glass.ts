import Event from './Event';

export default class Glass extends Event {
  subscribers: Function[] = [];

  constructor(){
    super();
  }
  subscribe(targetGlass: Glass, subscriber: Function){
    targetGlass.subscribers.push(subscriber);
  }
  unSubscribe(targetGlass: Glass, subscriber: Function){
    for(let i=0; i<targetGlass.subscribers.length; i++){
      let subscriber = targetGlass.subscribers[i];
      if(subscriber === subscriber){
        targetGlass.subscribers.splice(i, 1);
      }
    }
  }
}