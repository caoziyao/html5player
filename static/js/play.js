const file = require('./static/js/file')
const Music = require('./static/js/music')
const Control = require('./static/js/control')

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
        log(playList);
    });
}


// 播放音乐
var playMusicListener = function () {
    binAll('.li-music', 'click', function (event) {
        var target = event.target;     // 播放列表
        var path = target.dataset.src;
        // musicObj = new Music('#id-audio-player');
        // musicObj.setSrc(path);
        musicObj = new Music(path);
    })
}



// 音乐播放
var musicCanPlayEvent = function () {
    musicObj.play();
}

// 音乐暂停
var musicPauseEvent = function () {
    musicObj.pause();
}

// playIcon click evnet
var playIconClickEvent = function (event) {
    var target = event.target;
    var isPaused = musicObj.isPaused();
    var isEnded = musicObj.isEnded();

    if ( isPaused || isEnded ) {
        musicObj.play();
    }
}

// pauseIcon click event
var pauseIconClickEvent = function () {
    var target = event.target;
    var isPaused = musicObj.isPaused();

    if (!isPaused) {
        musicObj.pause();
    }
    
}

// 音乐静音
var volumeIconClickEvent = function () {
    musicObj.mute();
    ctrol.setVolumeBarZero()
}


var muteIconClickEvent = function () {
    var volume = musicObj.getVolume();

    musicObj.unmute();
    ctrol.setVolumeBar(volume);

}

// 播放进度条
var processPlayBar = function (curTime, totalTime) {
    var played = curTime / totalTime;
    ctrol.setPlayBar(played);

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
    var interval = 500;  // 单位 ms
    var music = musicObj.music;

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
    var width = ctrol.totalPlayWith;
    var offsetX = event.offsetX;

    musicObj.setCurrentTime(offsetX / width);

}

var initVolumeProcessBar = function () {
    var music = e('#id-audio-player');
    var totalBar = e('#id-total-volume');
    var currentBar = e('#id-current-volume');
    var totalVolume = totalBar.clientWidth;
    var currentVolume = currentBar.clientWidth;
    var defaultSrc = music.querySelector('source').src.split('file://').pop()
    var decdefault = decodeURI(defaultSrc);
    var volume =  currentVolume / totalVolume;

    musicObj = new Music(defaultSrc);
    musicObj.setVolume(volume);

    playList.push(decdefault)
}


// 音量进度条
var volumeProcessBarEvent = function (event) {
    var target = event.target;

    var totalVolume = ctrol.totalVolume;
    var offsetX = event.offsetX;
    var volume = offsetX / totalVolume

    ctrol.setVolumeBar(volume);
    musicObj.setVolume(volume);


}

// 上一首
var backIconClickEvent = function () {
    var currSrc = musicObj.getCurrentSrc();

    var next = 0;
    var len = playList.length;
    for (var i = 0; i < len; i++) {
        var source = playList[i];
        if (source == currSrc) {
            next = i == 0 ? len - 1 : i - 1 ;
            break;
        }
    }

    var next_song = playList[next];
    musicObj.setSrc(next_song);
}

// 下一首
var forwardIconClickEvent = function () {
    var currSrc = musicObj.getCurrentSrc();

    var next = 0;
    var len = playList.length;
    for (var i = 0; i < len; i++) {
        var source = playList[i];
        if (source == currSrc) {
            next = i == len - 1 ? 0 : i + 1 ;
            break;
        }
    }

    var next_song = playList[next];
    musicObj.setSrc(next_song);
    
}


// 监听事件
var addListeners = function () {

    ctrol = new Control();

    var playIcon = e('#id-icon-play');
    var pauseIcon = e('#id-icon-pause');
    var volumeIcon = e('#id-icon-volume');
    var muteIcon = e('#id-icon-mute');
    var openFileBtn = e('#id-open-file');  // 打开
    var musicProcessBar = e('#id-control-bar'); // 播放进度条
    var volumeProcessBar = e('#id-volume-bar'); // 音乐进度条
    var backIcon = e('#id-icon-play-back');
    var forwardIcon = e('#id-icon-play-forward');

    musicObj.music.addEventListener('canplay', musicCanPlayEvent);
    musicObj.music.addEventListener('ended', musicPauseEvent);

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
    initVolumeProcessBar();   // 初始化音量

    addListeners();

}

window.onload = function () {
  __main()
}


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
