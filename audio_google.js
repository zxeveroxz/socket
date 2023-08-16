const gTTS = require('gtts');
let path = require('path');
let fs = require("fs");
let date = new Date().getTime();
var filename = path.join(__dirname, "publico", "audio_" + date + ".mp3");

const leerArchivo = (texto) => {
    return new Promise((resolve, reject) => {

        var speech = texto;
        var gtts = new gTTS(speech, 'es-es');

        gtts.save(filename, function (err, result) {
            if (err) { return reject(err); }
            console.log(result);
            resolve(filename);
        });

    });
};



module.exports = leerArchivo