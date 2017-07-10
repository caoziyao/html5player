var log = function() {
  console.log.apply(console, arguments)
}

var e = function(sel) {
  return document.querySelector(sel)
}

var es = function(sel) {
  return document.querySelectorAll(sel)
}

var bindEvent = function(element, eventName, callback) {
  element.addEventListener(eventName, callback)
}

var binAll = function(selector, eventName, callback) {
  var elements = document.querySelectorAll(selector)
  for(var i=0; i<elements.length; i++) {
    var e = elements[i]
    bindEvent(e, eventName, callback)
  }
}

// localStorage
var showStorage = function (storage) {
  for (var i = 0; i < storage.length; i++) {
    var key = storage.key(i);
    var item = storage.getItem(key);
    log(key, item)
  }
}

// music
// 从 localStorage 添加文件到播放列表
// 格式：
// {filename: url, ...}
var initMusicList = function () {
    // localStorage.setItem('myCat', 'Tom');
    var myStorage = localStorage;
    // myStorage.clear()
    log('localStorage', myStorage)
    for (var i = 0; i < myStorage.length; i++) {
        var filename = myStorage.key(i)
        var url = myStorage.getItem(filename)
        appendHtml(filename, url)
    }
}

// 添加 music 到 localStorage
var loadMusicStorage = function () {
    var music = {
        '1.mp3': 'music/1.mp3',
        '2.mp3': 'music/2.mp3',
        '3.mp3': 'music/3.mp3',
        '4.mp3': 'music/4.mp3',
    }
    var myStorage = localStorage;
    var keyList = Object.keys(music);
    for (var i = 0; i < keyList.length; i++) {
        var key = keyList[i];
        var path = music[key]
        myStorage.setItem(key, path)
    }

}


var loadFileEventListener = function () {
    var btn = document.getElementById('file');
    btn.addEventListener('change', handleFileSelect, false);

    var a = new Array();

    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();
            reader.readAsText(file);
            console.log(file, reader);
            reader.onload = loaded;
        }
    }

    // 添加 music 到 localStorage
    var loaded = function (evt) {
        log('evt', evt, evt.path)
    }
}


