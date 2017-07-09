/**
 * Created by cczy on 2017/7/9.
 */
const fs = require('fs');
const {dialog} = require('electron').remote;


class File {
    constructor() {

    }

    openDailog(callback) {
        dialog.showOpenDialog( (fileNames) => {
            // log('show open dialog', fileNames);
            if (fileNames === undefined) {
                console.log("No file selected");
                return;
            }
            callback(fileNames)
        })

    }

    test() {
        log('hello')
    }
}

// var abc = function () {
//     log('hello')
// };
//
// var ccc = {
//     abc: abc,
// }


var file = new File()

module.exports = file
