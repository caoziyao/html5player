/**
 * Created by cczy on 2017/7/12.
 */
const PlayList = require('./play_list')

class MusicPlay{
    constructor() {
        this.setup()
    }

    static new(...args) {
        this.i = this.i ||  new this(...args)
        return this.i
    }

    setup() {
        let ele = '#id-audio-player';
        let path = 'music/1.mp3'
        this.music = _e(ele);
        this.setSrc(path)

        this.playList = PlayList.new()
        // 播放状态
    }


    setSrc(src) {
        this.music.src = src;
    }


    initVolume () {
        var music = e('#id-audio-player');
        var totalBar = e('#id-total-volume');
        var currentBar = e('#id-current-volume');
        var totalVolume = totalBar.clientWidth;
        var currentVolume = currentBar.clientWidth;
        var defaultSrc = music.querySelector('source').src.split('file://').pop()
        var decdefault = decodeURI(defaultSrc);
        var volume =  currentVolume / totalVolume;

        // music.volume = volume;
        playList.push(decdefault);
        this.setVolume(volume);

    }
    stop() {
        // 停止播放
        this.music.currentTime = 0
        this.music.pause()
    }
    backward() {
        // 上一首
        let list = this.playList
        let name = this.music.dataset.name
        let index = this.indexOfPlayList(name)
        // let next = 0
        if (index == 0) {
            var next = list.playList.length - 1
        } else {
            var next = (index - 1) % list.playList.length
        }
        this.setPlayerByIndex(next)
    }

    indexOfPlayList(name) {
        // 根据名称查找下标
        let list = this.playList
        for (let i = 0; i < list.playList.length; i++) {
            let l = list.playList[i]
            if (name === l[0]) {
                return i
            }
        }
        // 没找到返回 0
        return 0
    }

    setPlayerByIndex(index) {
        // 根据下标设定歌曲
        let list = this.playList
        let name = list.playList[index][0]
        let src = list.playList[index][1]
        // this.music.src = src
        this.music.load(src)
        this.play()
        // this.music.dataset.name = name
        this.music.setAttribute('data-name', name)
        log('src', name, src)
    }

    forward() {
        // 下一首
        let list = this.playList
        let name = this.music.dataset.name
        let index = this.indexOfPlayList(name)
        let next = (index + 1) % list.playList.length
        this.setPlayerByIndex(next)
    }

    random() {
        // 随机播放
        let list = this.playList
        let random = Math.random() * (list.playList.length - 1)
        let next = Math.floor(random)
        this.setPlayerByIndex(next)
    }

    play() {
        let self = this
        this.music.play();
    }

    pause() {
        this.music.pause();
    }

    unmute() {
        var volumeIcon = e('#id-icon-volume');
        var muteIcon = e('#id-icon-mute');
        this.music.muted = false;
        volumeIcon.classList.remove('hidden');
        muteIcon.classList.add('hidden');
    }

    mute() {
        var volumeIcon = e('#id-icon-volume');
        var muteIcon = e('#id-icon-mute');
        this.music.muted = true;
        volumeIcon.classList.add('hidden');
        muteIcon.classList.remove('hidden');
    }

    isPaused() {
        return this.music.paused;
    }

    isEnded() {
        return this.music.ended;
    }



    getVolume() {
        return this.music.volume;
    }

    getDuration() {
        return this.music.duration;
    }

    getCurrentSrc() {
        let src =  this.music.currentSrc.split('file://').pop();
        return decodeURI(src);
    }

    getCurrentTime() {
        return this.music.currentTime;
    }


    setCurrentTime(cur) {
        this.music.currentTime = cur * this.getDuration();
    }

    setVolume(cur) {
        // 音量 0-1
        this.music.volume = cur;
    }

    registerMusicEvent(type, listener) {
        this.music.addEventListener(type, listener);
    }
}

module.exports = MusicPlay;
