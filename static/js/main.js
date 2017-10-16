// const file = require('./static/js/file')
const MusicPlay = require('./static/js/music_play')
// const Compt = require('./static/js/components')
const PlayList = require('./static/js/play_list')

// playList = []


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
    compt.setVolumeBarZero()
}


var muteIconClickEvent = function () {
    var volume = musicObj.getVolume();

    musicObj.unmute();
    compt.setVolumeBar(volume);

}

// 播放进度条
var processPlayBar = function (curTime, totalTime) {
    var played = curTime / totalTime;
    compt.setPlayBar(played);

}

// 播放时间
var processPlayTxt = function (curTime, totalTime) {
    var curTimeTxt = e('#id-current-time');
    var totalTimeTxt = e('#id-total-time');

    totalTimeTxt.innerHTML = totalTime;
    curTimeTxt.innerHTML = curTime;
}




// 点击播放进度条
var musicProcessBarEvent = function (event) {
    var target = event.target;
    var width = compt.totalPlayWith;
    var offsetX = event.offsetX;

    musicObj.setCurrentTime(offsetX / width);
    compt.setPlayBar(offsetX / width);

}



// 音量进度条
var volumeProcessBarEvent = function (event) {
    var target = event.target;

    var totalVolume = compt.totalVolume;
    var offsetX = event.offsetX;
    var volume = offsetX / totalVolume

    compt.setVolumeBar(volume);
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

    musicObj.registerAllEvent =  () => {
        musicObj.registerMusicEvent('canplay', musicCanPlayEvent);
        musicObj.registerMusicEvent('ended', musicPauseEvent);
    }


    compt.registerAllEvent =  () => {
        compt.registerEvent('#id-icon-play', 'click', playIconClickEvent);
        compt.registerEvent('#id-icon-play-back', 'click', backIconClickEvent);
        compt.registerEvent('#id-icon-play-forward', 'click', forwardIconClickEvent);
        compt.registerEvent('#id-icon-pause', 'click', pauseIconClickEvent);
        compt.registerEvent('#id-icon-volume', 'click', volumeIconClickEvent);
        compt.registerEvent('#id-icon-mute', 'click', muteIconClickEvent);
        compt.registerEvent('#id-open-file', 'click', openFileBtnEvent);
        compt.registerEvent('#id-control-bar', 'click', musicProcessBarEvent);
        compt.registerEvent('#id-volume-bar', 'click', volumeProcessBarEvent);

    }

    compt.registerAllEvent();
    musicObj.registerAllEvent();


    // 定时刷新任务
    var interval = 500;  // 单位 ms
    setInterval(function(){
        var duration = musicObj.getDuration();
        var currentTime = musicObj.getCurrentTime();
        var totalTime = (duration / 60).toFixed(2);
        var curTime = (currentTime / 60).toFixed(2);
        // 播放进度条
        processPlayBar(curTime, totalTime);
        // 时间显示
        processPlayTxt(curTime, totalTime);
    }, interval)

}


// 程序入口
const __main = function () {
    let list = [
        ['abc1', 'music/1.mp3'],
        ['abc2', 'music/2.mp3'],
        ['abc4', 'music/3.mp3'],
        ['abc4', 'music/4.mp3'],
        ['成都', 'music/成都.mp3'],
        ['匆匆那年', 'music/匆匆那年.mp3'],
        ['刚好遇见你', 'music/刚好遇见你.mp3'],
        ['童话镇', 'music/童话镇.mp3'],
    ]

    let playList = PlayList.new(list)
    // 渲染播放列表
    playList.renderPlayList()

    let music = MusicPlay.new()
    music.play()

}

window.onload = function () {
  __main()
}
