import Airglass from './Airglass';
import Renderable from './Renderable';
import Effect from './Effect';
import AlterProgress from './AlterProgress';
import Progress from './Progress';

function extend(extendedGlass, prototype) {
  let Glass = function (params) {
    extendedGlass.call(this, params);
    prototype._constructor && prototype._constructor.call(this, params);
  };
  function foo(){}
  foo.prototype = extendedGlass.prototype;
  Glass.prototype = new foo();
  Glass.prototype.constructor = Glass;
  for (var i in prototype) Glass.prototype[i] = prototype[i];
  return Glass;
}

export {
  Airglass,
  Progress,
  AlterProgress,
  Effect,
  Renderable,
  extend
}
