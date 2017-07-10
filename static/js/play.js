const file = require('./static/js/file')


// 添加播放列表
var appendHtml = function (filename, url) {
  var html = `<li class="li-music"><a class="li-music-link" data-src='${url}'>${filename}</a></li>`;
  var ul = e('.music-list');
  ul.insertAdjacentHTML('afterBegin', html)
}


 // 打开文件
var openFileBtnEvent = function () {
    var target = event.target;
    file.openDailog( (fileNames) => {
        // log('file', fileNames)
        for (var i = 0; i < fileNames.length; i++) {
            var path = fileNames[i];
            var filename = path.split('/').pop();
            appendHtml(filename, path);
            playMusicListener();  // 播放音乐事件
        }
    });
}


// 播放音乐
var playMusicListener = function () {
    binAll('.li-music', 'click', function (event) {
        var target = event.target;     // 播放列表
        var path = target.dataset.src;
        music.src = path;
    })
}


// 音乐播放
var musicPlay = function () {
    var playIcon = e('#id-icon-play');
    var pauseIcon = e('#id-icon-pause');
    music.play();
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden')

}

// 音乐暂停
var musicPause = function() {
    var playIcon = e('#id-icon-play');
    var pauseIcon = e('#id-icon-pause');
    music.pause();
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
}

// 音乐静音
var musicVolume = function() {
    var volumeIcon = e('#id-icon-volume');
    var muteIcon = e('#id-icon-mute');
    music.muted = false;
    volumeIcon.classList.remove('hidden');
    muteIcon.classList.add('hidden');
}

// 音乐静音
var musicMute = function() {
    var volumeIcon = e('#id-icon-volume');
    var muteIcon = e('#id-icon-mute');
    music.muted = true;
    volumeIcon.classList.add('hidden');
    muteIcon.classList.remove('hidden');
}



// music can play
var musicCanPlayEvent = function () {
    musicPlay();
}

// music pause
var musicPauseEvent = function () {
    musicPause();
}

// playIcon click evnet
var playIconClickEvent = function (event) {
    var target = event.target;
    if (music.paused || music.ended) {
        musicPlay();
    }
}

// pauseIcon click event
var pauseIconClickEvent = function () {
    var target = event.target;
    if (!music.paused) {
        musicPause();
    }
    
}

//
var volumeIconClickEvent = function () {
    musicMute();

}

//
var muteIconClickEvent = function () {
    musicVolume();
}

// 监听事件
var addListeners = function () {
    music = e('#id-audio-player');   // 播放控件
    var playIcon = e('#id-icon-play');
    var pauseIcon = e('#id-icon-pause');
    var volumeIcon = e('#id-icon-volume');
    var muteIcon = e('#id-icon-mute');
    var openFileBtn = e('#id-open-file');  // 打开

    music.addEventListener('canplay', musicCanPlayEvent);
    music.addEventListener('ended', musicPauseEvent);

    playIcon.addEventListener('click', playIconClickEvent);
    pauseIcon.addEventListener('click', pauseIconClickEvent);
    volumeIcon.addEventListener('click', volumeIconClickEvent);
    muteIcon.addEventListener('click', muteIconClickEvent);

    openFileBtn.addEventListener('click', openFileBtnEvent);

}


// 程序入口
var __main = function () {
    addListeners();
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
