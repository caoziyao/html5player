
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

    stop(music, target) {
        // 停止播放
        music.stop()
    }
    backward(music, target) {
        // 上一首
        music.backward()
    }

    forward(music, target) {
        // 下一首
        music.forward()
    }

    random(music, target) {
        // 随机播放
        music.random()
    }

    pause(music, target) {
        // 暂停
        if (music.music.paused) {
            // 被暂停，则播放
            target.classList.remove('fa-play')
            target.classList.add('fa-pause')
            music.play()
        } else {
            // 暂停
            target.classList.remove('fa-pause')
            target.classList.add('fa-play')
            music.pause()

        }
    }

    play(music, target) {
        // 播放
        if (music.music.paused) {
            // 被暂停，则播放
            target.classList.remove('fa-play')
            target.classList.add('fa-pause')
            music.play()
        } else {
            // 暂停
            target.classList.remove('fa-pause')
            target.classList.add('fa-play')
            music.pause()

        }

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
            fun(music, target)
        })
    }
}


module.exports = ControlButton;
