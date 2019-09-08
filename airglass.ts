import Renderer from './Renderer';
import Scene from './Scene';
import Rect from './Rect';

function subscribe(target, eventName, func){
  target.subscribers.push({
    eventName: eventName,
    func: func
  });
}

function unSubscribe(target, eventName, func){
  for(let i=0; i<target.subscribers.length; i++){
    let subscriber = target.subscribers[i];
    if(subscriber.eventName === eventName && subscriber.func === func){
      target.subscribers.splice(i, 1);
    }
  }
}

export {
  Renderer,
  Scene,
  Rect,
}
