
const log = console.log.bind(console)

const _e = (sel) => {
  return document.querySelector(sel)
}

const _es = (sel) => {
  return document.querySelectorAll(sel)
}

const bindEvent = (element, eventName, callback) => {
  element.addEventListener(eventName, callback)
}

const binAll = (selector, eventName, callback) => {
  let es = document.querySelectorAll(selector)
  for(var i=0; i<es.length; i++) {
    var e = es[i]
    bindEvent(e, eventName, callback)
  }
}
