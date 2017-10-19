// const MusicPlay = require('./music_play')

class PlayList{
    constructor(list) {
        this.setup(list)
    }

    static new(...args) {
        this.i = this.i ||  new this(...args)
        return this.i
    }

    setup(list) {
        this.element = '#id-play-list'
        this.playList = list
    }

    template(item) {
        // item 每首歌，包括 name, path
        let name = item[0]
        let path = item[1]
        let t = `
            <li class="play-list-li" data-path=${path}>${name}</li>
        `
        return t
    }

    renderPlayList() {
        // 生成歌单
        // element 歌单列表Id
        let e = _e(this.element)

        for (let i = 0; i < this.playList.length; i++) {
            let item = this.playList[i]
            let t = this.template(item)
            e.insertAdjacentHTML('beforeend', t)
        }

        // this.addListeners()
    }

}


module.exports = PlayList;
