
class PlayList{
    constructor(path) {
        this.init()
    }

    static new(...args) {
        return new this(...args)
    }

    init() {
        this.playList = [
            ['abc', '../../music/1.mp3'],
            ['abc1', 'music/1.mp3'],
            ['abc2', 'music/1.mp3'],
            ['abc3', 'music/1.mp3'],
        ]
    }

    template(item) {
        // item 每首歌，包括 name, path
        let name = item[0]
        let path = item[1]
        let t = `
            <li data-path=${path}>${name}</li>
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
            e.insertAdjacentHTML('beforeBegin', t)
        }

    }
}


module.exports = PlayList;
