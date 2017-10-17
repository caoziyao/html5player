
const MusicPlay = require('./music_play')

class ControlButton{
    // 控制按钮
    constructor() {

    }

    static new(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    setup(list) {
        this.element = '#id-music-control'
        //this.playList = list
    }

    addListeners() {
        // 添加点击播放事件
        let music = MusicPlay.new()
        let e = this.element + ' '

        binAll('#id-music-control i', 'click', (event) => {
            let target = event.target
            // getAttribute('id')
            let id = target.id
            log('id', id)
        })
    }
}


module.exports = ControlButton;
