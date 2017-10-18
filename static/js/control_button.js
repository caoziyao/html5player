
const MusicPlay = require('./music_play')

class ControlButton{
    // 控制按钮
    constructor() {
        this.setup()
    }

    static new(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    setup() {
        this.element = '#id-music-control'
        this.actions = {
            'pause': this.pause,
            'play': this.play,
            'random': this.random,
            'stop': this.stop,
            'backward': this.backward,
            'forward': this.forward,
            'random': this.random,
        }
    }

    stop(target, music) {

    }
    backward(target, music) {

    }

    forward(target, music) {

    }

    random(target, music) {
        // music.play()
    }

    pause(target, music) {
        target.classList.remove('fa-pause')
        target.classList.add('fa-play')
        music.pause()
    }

    play(target, music) {
        target.classList.remove('fa-play')
        target.classList.add('fa-pause')
        music.play()
    }

    addListeners() {
        // 添加点击播放事件
        let self = this
        let music = MusicPlay.new()
        let e = this.element + ' '

        binAll('#id-music-control i', 'click', (event) => {
            let target = event.target
            let a = target.dataset.action
            let fun = self.actions[a]
            fun(target, music)
        })
    }
}


module.exports = ControlButton;
