
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

var a = e('#id-audio-player')
var playBtn = e('#id-btn-play')
var pauseBtn = e('#id-btn-pause')
log('a', a, playBtn, pauseBtn)

// play
playBtn.addEventListener('click', function() {
  log('click play')
  a.play()
})

// pause
pauseBtn.addEventListener('click', function() {
  log('click pause')
  a.pause()
})

var currSpenTime = e('#id-currtime')
var totalSpenTime = e('#id-totaltime')

a.addEventListener('canplay', function(){
  var min = (a.duration / 60).toFixed(2)
  totalSpenTime.innerHTML = min
  a.play()
})

var getCurrTime = function() {
  var interval = 500
  setInterval(function(){
    var currtime = (a.currentTime / 60).toFixed(2)
    currSpenTime.innerHTML = currtime
  }, interval)
}

getCurrTime()


// var musicList = es('.ul-music')
// log('mjusiclist', musicList)
binAll('.ul-music', 'click', function(event){
  log('all click')
  var self = event.target
  var src = self.dataset.src
  var path = 'music/' + src
  a.src = path
})


// a.addEventListener('ended', function(){
//   a.play()
// })


var sunplay = function() {
  var nextSong = 0
  var list = ['1.mp3', '2.mp3', '3.mp3']
  a.addEventListener('ended', function(){
    nextSong = nextSong + 1
    if(nextSong == 2) {
      nextSong = 0
    }
    log('i', nextSong)
    var path = 'music/' + list[nextSong]
    a.src = path

  })
}

// 
var randPlay = function() {
  var nextSong = 0
  var list = ['1.mp3', '2.mp3', '3.mp3']
  a.addEventListener('ended', function(){
    nextSong = Math.floor(Math.random()*(3-0)+0)
    log('i', nextSong)
    var path = 'music/' + list[nextSong]
    a.src = path
  })
}
randPlay()
