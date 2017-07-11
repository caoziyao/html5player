const file = require('./static/js/file')

playList = []


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

            playList.push(path);
        }
        log(playList)
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

    var currentBar = e('#id-current-volume');
    currentBar.style.width = 0 + 'px';


}

//
var muteIconClickEvent = function () {
    musicVolume();

    var totalBar = e('#id-total-volume');
    var currentBar = e('#id-current-volume');
    var totalVolume = totalBar.clientWidth;

    var css = music.volume * totalVolume
    currentBar.style.width = css + 'px';
}

// 播放进度条
var processPlayBar = function (curTime, totalTime) {
    var totalBar = e('#id-total-music');
    var playedBar = e('#id-played-music');

    var width = totalBar.clientWidth;
    var played = curTime / totalTime * width;
    var css = played + 'px'

    playedBar.style.width = css
}

// 播放时间
var processPlayTxt = function (curTime, totalTime) {
    var curTimeTxt = e('#id-current-time');
    var totalTimeTxt = e('#id-total-time');

    totalTimeTxt.innerHTML = totalTime;
    curTimeTxt.innerHTML = curTime;
}


// 定时刷新任务
var processPlayedEvent = function () {
    var interval = 500;


    setInterval(function(){
        var totalTime = (music.duration / 60).toFixed(2);
        var curTime = (music.currentTime / 60).toFixed(2);
        // 播放进度条
        processPlayBar(curTime, totalTime);
        // 时间显示
        processPlayTxt(curTime, totalTime);
    }, interval)

}

// 点击播放进度条
var musicProcessBarEvent = function (event) {
    var target = event.target;
    var totalBar = e('#id-total-music');
    var width = totalBar.clientWidth;
    var offsetX = event.offsetX;

    music.currentTime = offsetX / width * music.duration;

}


var initVolumeProcessBar = function () {
    var totalBar = e('#id-total-volume');
    var currentBar = e('#id-current-volume');
    var totalVolume = totalBar.clientWidth;
    var currentVolume = currentBar.clientWidth;

    music.volume = currentVolume / totalVolume;
}

// 音量进度条
var volumeProcessBarEvent = function (event) {
    var currentBar = e('#id-current-volume');
    var target = event.target;
    var totalBar = e('#id-total-volume');
    var totalVolume = totalBar.clientWidth;
    var offsetX = event.offsetX;

    music.volume = offsetX / totalVolume;
    currentBar.style.width = offsetX + 'px';

}

// 上一首
var backIconClickEvent = function () {
    var currSrc = music.currentSrc.split('file://').pop();
    var encurrSrc = decodeURI(currSrc)
    var next = 0;
    var len = playList.length;
    for (var i = 0; i < len; i++) {
        var source = playList[i];
        if (source == encurrSrc) {
            next = i == 0 ? len - 1 : i - 1 ;
            break;
        }
    }

    music.src = playList[next];
}

// 下一首
var forwardIconClickEvent = function () {
    var currSrc = music.currentSrc.split('file://').pop();
    var encurrSrc = decodeURI(currSrc)
    var next = 0;
    var len = playList.length;
    for (var i = 0; i < len; i++) {
        var source = playList[i];
        if (source == encurrSrc) {
            next = i == len - 1 ? 0 : i + 1 ;
            break;
        }
    }

    music.src = playList[next];
    
}


// 监听事件
var addListeners = function () {
    music = e('#id-audio-player');   // 播放控件
    var playIcon = e('#id-icon-play');
    var pauseIcon = e('#id-icon-pause');
    var volumeIcon = e('#id-icon-volume');
    var muteIcon = e('#id-icon-mute');
    var openFileBtn = e('#id-open-file');  // 打开
    var musicProcessBar = e('#id-control-bar'); // 播放进度条
    var volumeProcessBar = e('#id-volume-bar'); // 音乐进度条
    var backIcon = e('#id-icon-play-back');
    var forwardIcon = e('#id-icon-play-forward');

    var defaultSrc = music.querySelector('source').src.split('file://').pop()
    playList.push(defaultSrc)



    initVolumeProcessBar();   // 初始化音量
    music.addEventListener('canplay', musicCanPlayEvent);
    music.addEventListener('ended', musicPauseEvent);


    backIcon.addEventListener('click', backIconClickEvent);
    forwardIcon.addEventListener('click', forwardIconClickEvent);
    playIcon.addEventListener('click', playIconClickEvent);
    pauseIcon.addEventListener('click', pauseIconClickEvent);
    volumeIcon.addEventListener('click', volumeIconClickEvent);
    muteIcon.addEventListener('click', muteIconClickEvent);
    musicProcessBar.addEventListener('click', musicProcessBarEvent);
    volumeProcessBar.addEventListener('click', volumeProcessBarEvent);

    openFileBtn.addEventListener('click', openFileBtnEvent);


    // 定时刷新任务
    processPlayedEvent();


}


// 程序入口
var __main = function () {
    addListeners();
}

window.onload = function () {
  __main()
}




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
