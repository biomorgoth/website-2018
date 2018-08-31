var country;
window.storage = (typeof Storage !== "undefined") ? 'local' : 'cookie';
var urls = {
  cl: 'http://www.jooycar.cl',
  mx: 'http://www.jooycar.mx',
  br: 'http://www.jooycar.com.br',
  co: 'http://www.jooycar.co',
  pe: 'http://www.jooycar.com.pe',
  us: 'http://usa.jooycar.com'
};
window.getLocalVal = {
  local: function(key) {
    return localStorage.getItem(key) || null;
  },
  cookie: function(key) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  }
};

window.setLocalVal = {
  local: function(key, val) {
    return localStorage.setItem(key, val);
  },
  cookie: function(key, val) {
    return document.cookie = key+"="+val+"; path=/; domain=www.jooycar.com";
  }
};

var country =  window.getLocalVal[window.storage]('country');
if (country && !window.location.hash) {
  var url = urls[country];
  if (url) {
    top.location.href = url;
  }
}

if (window.location.hash) {
  history.pushState("", document.title, window.location.pathname);
}
