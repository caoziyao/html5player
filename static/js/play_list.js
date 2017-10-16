const MusicPlay = require('./music_play')

class PlayList{
    constructor(path) {
        this.init()
    }

    static new(...args) {
        return new this(...args)
    }

    init() {
        this.playList = [
            ['abc', 'music/1.mp3'],
            ['abc1', 'music/2.mp3'],
            ['abc2', 'music/3.mp3'],
            ['abc3', 'music/4.mp3'],
        ]
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

    renderPlayList(element) {
        // 生成歌单
        // element 歌单列表Id
        let e = _e(element)

        for (let i = 0; i < this.playList.length; i++) {
            let item = this.playList[i]
            let t = this.template(item)
            e.insertAdjacentHTML('beforeend', t)
        }

        this.addListeners()
    }

    addListeners() {
        // 添加点击播放事件
        let music = MusicPlay.new()
        binAll('.play-list-li', 'click', (event) => {
            let target = event.target
            let path = target.dataset.path
            music.setSrc(path)
            music.play()
        })
    }
}


module.exports = PlayList;
