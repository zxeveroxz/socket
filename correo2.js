const { writeFile } = require('fs/promises');
async function writeToFile(fileName, data) {
    try {
        await writeFile(fileName, data);
        console.log(`Wrote data to ${fileName}`);
    } catch (error) {
        console.error(`Got an error trying to write the file: ${error.message}`);
    }
}

let leer2 = () => {
    var respuesta = null;
    var MailListener = require("mail-listener2");
    var currentDate = new Date().toUTCString();
    var time = new Date().getTime();
    const config = {
        username: "szegarrac@sedapal.com.pe",
        password: "Sedapal4",
        host: "correo.sedapal.com.pe",
        port: 993, // imap port
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        mailbox: ["CONFORMIDAD SUNASS"],//["Falta de tapa de buzon"]], // mailbox to monitor
        markSeen: true, // all fetched email willbe marked as seen and not fetched next time
        fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
        //searchFilter: ["NEW",["SINCE", currentTime + 10000]] //["SEEN",["SINCE", currentTime + 10000]] //["ALL"]
        //searchFilter: ["UNSEEN", ["SINCE", currentDate]]
        //searchFilter: ["ALL", ["SINCE", currentDate]]
        searchFilter: ["\UNSEEN"]
    };

    var mailListener2 = new MailListener(config);
    mailListener2.start(); // start listening
    // stop listening
    //mailListener.stop();

    mailListener2.on("server:connected", function () {
        console.log("imapConnected a conformidad sunass");
    });

    mailListener2.on("server:disconnected", function () {
        console.log("imapDisconnected conformidad sunass");
    });

    mailListener2.on("error", function (err) {
        console.log(err);
    });

    var count = 0;
    mailListener2.on("mail", async function (mail, seqno, attributes) {
        i = ++count;
        if (mail.from[0].address != "radiosurq_conformidadsunass@sedapal.com.pe") {
            //console.log(mail); 
            //console.log(mail.from[0].address);

            var obj = {};
            obj.from = mail.from;
            obj.subject = mail.subject;
            obj.message = mail.text;
            obj.label = null;
            //var jsonString = await JSON.stringify(obj);
            //console.log(JSON.parse(jsonString));
            try {
                //writeToFile("./correos/" + attributes.uid + "_" + mail.from[0].address + ".txt", "Correo Nuevo de " + mail.from[0].name + ".|||Escribe " + obj.subject);
                mailListener2.stop();
            } catch (error) {
                console.log(error);
            }

        }

    });

    /*
    mailListener.start(); // start listening
    */
    setTimeout(async function () {
        mailListener2.stop(); // start listening
    }, 20 * 1000);
}

module.exports = { leer2 }
