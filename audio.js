var say = require('say');
let path = require('path');
let fs = require("fs");
let date = new Date().getTime();
var filename = path.join(__dirname, "publico", "audio_" + date + ".wav");
var filename2 = path.join(__dirname, "publico", "audio_ok_" + date + ".mp3");

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath)
/*
//Microsoft Helena Desktop
let audio = () => {
    let resp = await say.export(' Por medio de la presente se remite el Comunicado N°114-2022-GRH respecto al "Concurso Interno a nivel empresa para ocupar una vacante de Tecnico Comercial del Equipo Comercial - Ate Vitarte de la Gerencia Comercial, el cual ha quedado desierto" para conocimiento y acciones correspondientes.', 'Microsoft Helena Desktop', 0.90, filename, (err) => {
        if (err) {
            return console.error(err);
        }
        return filename;
        //console.log('Text has been spoken. ', filename);
    });
return resp; 
}
*/

const leerArchivo = (texto) => {
    return new Promise((resolve, reject) => {
        //voz = Microsoft Helena Desktop
        console.log(texto);
        say.export(' '+texto, '', 1.0, filename, (err) => {
            if (err) {
                //console.log("asiendo algo");
                return reject(err);
            }


            const outputFile = filename.replace(".wav", ".mp3");
            ffmpeg(
                 filename,                
            )
            //.audioBitrate(40)
            .audioFilters("volume=enable='between(t,0,t/2)':volume='2.5'", "volume=enable='between(t,t/2,t)':volume='2.5'")
            .on("error", (err) => {
                reject(err);
            }).on("end", () => {
                //console.log("se termino "+ outputFile);
                resolve(outputFile);            
                fs.unlinkSync(filename);    
            }).save(outputFile);

            
            
        });




        //resolve(filename);
        //console.log("se temrino de hacer algo b ueno " + filename);
    });
};



module.exports = leerArchivo