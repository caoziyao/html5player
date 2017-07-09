const file = require('./static/js/file')


var loadFileEventListener = function () {
  var btn = document.getElementById('file');
  btn.addEventListener('change', handleFileSelect, false);

  var a = new Array();

   function handleFileSelect(evt) {
       var files = evt.target.files; // FileList object
       for (var i = 0; i < files.length; i++) {
         var file = files[i];
         var reader = new FileReader();
         reader.readAsText(file);
         console.log(file, reader);
         reader.onload = loaded;
       }
   }

   // 添加 music 到 localStorage
   var loaded = function (evt) {
     log('evt', evt, evt.path)
   }
}





// 添加播放列表
var appendHtml = function (filename, url) {
  var html = `<li class="li-music" data-src='${url}'>${filename}</li>`;
  var ul = e('.music-list');
  ul.insertAdjacentHTML('afterBegin', html)
}


// 从 localStorage 添加文件到播放列表
// 格式：
// {filename: url, ...}
var initMusicList = function () {
  // localStorage.setItem('myCat', 'Tom');
  var myStorage = localStorage;
  // myStorage.clear()
  log('localStorage', myStorage)
  for (var i = 0; i < myStorage.length; i++) {
    var filename = myStorage.key(i)
    var url = myStorage.getItem(filename)
    appendHtml(filename, url)
  }
}

 // 添加 music 到 localStorage
 var loadMusicStorage = function () {
   var music = {
     '1.mp3': 'music/1.mp3',
     '2.mp3': 'music/2.mp3',
     '3.mp3': 'music/3.mp3',
     '4.mp3': 'music/4.mp3',
   }
   var myStorage = localStorage;
   var keyList = Object.keys(music);
   for (var i = 0; i < keyList.length; i++) {
    var key = keyList[i];
    var path = music[key]
    myStorage.setItem(key, path)
   }

 }


 // 播放事件
 var playEventListener = function () {
   var a = e('#id-audio-player');   // 播放控件
   a.addEventListener('canplay', function(){
     a.play()
   })

  //  var musics = es('.li-music');
   binAll('.li-music', 'click', function (event) {
     var target = event.target;     // 播放列表
       var path = target.dataset.src
       a.src = path
       a.play()
   })
 }



 // 打开文件
var openFileListener = function () {
    var ele = e('#id-open-file');

    ele.addEventListener('click', function () {
        file.openDailog(function (fileNames) {
            // log('file', fileNames)
            for (var i = 0; i < fileNames.length; i++) {
                var path = fileNames[i];
                var filename = path.split('/').pop()
                appendHtml(filename, path)
            }
        });

    })
}


// 监听时间
var addListener = function () {
    openFileListener()
}


// 程序入口
var __main = function () {
    addListener()
  // loadMusicStorage();
  // initMusicList();
  // 从 localStorage 添加文件到播放列表
  // loadFileEventListener()
  // 播放事件
  // playEventListener()
}

window.onload = function () {
  __main()
}



//
// window.onload = function () {
//
//
// var a = e('#id-audio-player')
// var playBtn = e('#id-audio-player')
// var pauseBtn = e('#id-btn-pause')
// log('a', a, playBtn, pauseBtn)
//
// // play
// playBtn.addEventListener('click', function() {
//   log('click play')
//   a.play()
// })
//
// // pause
// // pauseBtn.addEventListener('click', function() {
// //   log('click pause')
// //   a.pause()
// // })
//
// var currSpenTime = e('#id-currtime')
// var totalSpenTime = e('#id-totaltime')
//
// a.addEventListener('canplay', function(){
//   var min = (a.duration / 60).toFixed(2)
//   totalSpenTime.innerHTML = min
//   a.play()
// })
//
// var getCurrTime = function() {
//   var interval = 500
//   setInterval(function(){
//     var currtime = (a.currentTime / 60).toFixed(2)
//     currSpenTime.innerHTML = currtime
//   }, interval)
// }
//
// getCurrTime()
//
//
// // var musicList = es('.ul-music')
// // log('mjusiclist', musicList)
// binAll('.ul-music', 'click', function(event){
//   log('all click')
//   var self = event.target
//   var src = self.dataset.src
//   var path = 'music/' + src
//   a.src = path
// })
//
//
// // a.addEventListener('ended', function(){
// //   a.play()
// // })
//
//
// var sunplay = function() {
//   var nextSong = 0
//   var list = ['1.mp3', '2.mp3', '3.mp3']
//   a.addEventListener('ended', function(){
//     nextSong = nextSong + 1
//     if(nextSong == 2) {
//       nextSong = 0
//     }
//     log('i', nextSong)
//     var path = 'music/' + list[nextSong]
//     a.src = path
//
//   })
// }
//
// //
// var randPlay = function() {
//   var nextSong = 0
//   var list = ['1.mp3', '2.mp3', '3.mp3']
//   a.addEventListener('ended', function(){
//     nextSong = Math.floor(Math.random()*(3-0)+0)
//     log('i', nextSong)
//     var path = 'music/' + list[nextSong]
//     a.src = path
//   })
// }
//
//
//   log('hwwof')
//    randPlay()
// };
