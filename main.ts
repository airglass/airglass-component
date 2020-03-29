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

console.info(`Airglass.js
Email: lanserdi@163.com
Doc: https://www.shuaihuajun.com/airglass/typedoc/`);

export {
  Airglass,
  Progress,
  AlterProgress,
  Effect,
  Renderable,
  extend
}
