const POP3Client = require('pop3');

// Configura las opciones de conexión al servidor POP3 de Hotmail
const config = {
  hostname: 'pop-mail.outlook.com',
  port: 995,
  tls: true,
  username: 's.zegarra@hotmail.com>', // Tu dirección de correo de Hotmail
  password: '@pocalipsiZ2002', // Tu contraseña de Hotmail
};

// Crea una instancia del cliente POP3
const client = new POP3Client(config);

// Maneja el evento de conexión
client.on('connect', () => {
  console.log('Conectado al servidor POP3');

  // Autentica con el servidor POP3
  client.login(() => {
    console.log('Autenticado en el servidor POP3');

    // Lista los mensajes en el buzón de entrada
    client.list((err, list) => {
      if (err) throw err;

      console.log(`Total de mensajes: ${list.length}`);

      // Descarga y muestra el contenido de los mensajes
      list.forEach((item) => {
        client.retr(item.seqno, (err, msg) => {
          if (err) throw err;

          console.log(`Mensaje #${item.seqno}:`);
          console.log(msg.toString());
        });
      });

      // Cierra la conexión al servidor POP3
      client.quit(() => {
        console.log('Desconectado del servidor POP3');
      });
    });
  });
});

client.on('error', (err) => {
  console.error(err);
});

// Conecta al servidor POP3
client.connect();
