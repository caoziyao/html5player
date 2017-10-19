/**
 * Created by cczy on 2017/7/9.
 */
const fs = require('fs');
const {dialog} = require('electron').remote;

class FileHandler {
    constructor() {

    }

    openDailog(callback) {
        //
        dialog.showOpenDialog( {
            properties: ['openFile', 'openDirectory', 'multiSelections', 'createDirectory'],
            filters: [
                {name: 'Music', extensions: ['mp3']},
            ],
        }, (fileNames) => {
            if (fileNames === undefined) {
                log("No file selected");
                return;
            }
            callback(fileNames)
        })
    }

    // 添加播放列表
    appendHtml(filename, url) {
        let html = `<li class="li-music"><a class="li-music-link" data-src='${url}'>${filename}</a></li>`;
        let ul = _e('.music-list');
        ul.insertAdjacentHTML('afterBegin', html)
    }

     // 打开文件
    openFileBtnEvent() {
        let self = this
        // let target = event.target;
        this.openDailog( (fileNames) => {
            // log('file', fileNames)
            for (var i = 0; i < fileNames.length; i++) {
                var path = fileNames[i];
                var filename = path.split('/').pop();
                self.appendHtml(filename, path);
                //playMusicListener();  // 播放音乐事件
                playList.push(path);
            }
        });
    }
}

module.exports = FileHandler
