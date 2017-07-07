var log = function() {
  console.log.apply(console, arguments)
}

var e = function(sel) {
  return document.querySelector(sel)
}

var es = function(sel) {
  return document.querySelectorAll(sel)
}

var bindEvent = function(element, eventName, callback) {
  element.addEventListener(eventName, callback)
}

var binAll = function(selector, eventName, callback) {
  var elements = document.querySelectorAll(selector)
  for(var i=0; i<elements.length; i++) {
    var e = elements[i]
    bindEvent(e, eventName, callback)
  }
}

// localStorage
var showStorage = function (storage) {
  for (var i = 0; i < storage.length; i++) {
    var key = storage.key(i);
    var item = storage.getItem(key);
    log(key, item)
  }
}

// music
