/**
 * Created by cczy on 2017/7/12.
 */

class MusicPlay{
    constructor(path) {
        let ele = '#id-audio-player';
        // this.music = _e(ele);
        // if (path != undefined) {
        //     this.setSrc(path);
        // }

    }

    static new(...args) {
        return new this(...args)
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
        var playIcon = e('#id-icon-play');
        var pauseIcon = e('#id-icon-pause');
        this.music.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden')
    }

    pause() {
        var playIcon = e('#id-icon-play');
        var pauseIcon = e('#id-icon-pause');
        this.music.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
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


    setSrc(src) {
        this.music.src = src;
    }

    registerMusicEvent(type, listener) {
        this.music.addEventListener(type, listener);
    }
}

module.exports = MusicPlay;
