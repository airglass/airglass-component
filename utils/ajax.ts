export default function ajax (url, opts = {}, cb){
  let client = new XMLHttpRequest();
  client.onreadystatechange = function(){
    if(client.status == 200 && client.readyState == 4){
      cb && cb(client.response);
    }
  }
  client.open('GET', url, true);
  client.send(null);
}