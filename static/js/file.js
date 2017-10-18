/**
 * Created by cczy on 2017/7/9.
 */
const fs = require('fs');
const {dialog} = require('electron').remote;

class File {
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
                console.log("No file selected");
                return;
            }
            callback(fileNames)
        })

    }

}



var file = new File()

module.exports = file
