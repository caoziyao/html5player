/**
 * Created by cczy on 2017/7/12.
 */


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

    play() {
        let self = this

        this.music.play();
        // var playIcon = e('#id-icon-play');
        // var pauseIcon = e('#id-icon-pause');

        // playIcon.classList.add('hidden');
        // pauseIcon.classList.remove('hidden')
    }

    pause() {
        // var playIcon = e('#id-icon-play');
        // var pauseIcon = e('#id-icon-pause');
        this.music.pause();
        // playIcon.classList.remove('hidden');
        // pauseIcon.classList.add('hidden');
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
