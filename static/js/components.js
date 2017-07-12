/**
 * Created by cczy on 2017/7/12.
 */


class Components {
    constructor() {
        const eleCurVolumeBar = '#id-current-volume';
        const eleTotalVolumeBar = '#id-total-volume';
        const eleCurPlayBar = '#id-played-music';
        const eleTotalPlayBar = '#id-total-music';

        // var totalBar = e('#id-total-music');
        // var playedBar = e('#id-played-music');

        this.curVolumeBar = e(eleCurVolumeBar);
        this.totalVolumeBar = e(eleTotalVolumeBar);
        this.curPlayBar = e(eleCurPlayBar);
        this.totalPlayBar = e(eleTotalPlayBar);

        this.totalVolume = this.totalVolumeBar.clientWidth;
        this.totalPlayWith = this.totalPlayBar.clientWidth;

    }


    setVolumeBarZero() {
        this.curVolumeBar.style.width = 0 + 'px';
    }


    setVolumeBar(volume) {
        // 音量 0-1
        var css = volume * this.totalVolume;
        this.curVolumeBar.style.width = css + 'px';
    }

    setPlayBar(played) {
        // played 播放 0-1
        var width = this.totalPlayWith
        var css = played * width + 'px'

        this.curPlayBar.style.width = css
    }

    registerEvent(element, type, listener) {
        let ele = e(element);
        ele.addEventListener(type, listener);
    }




}


module.exports = Components;
