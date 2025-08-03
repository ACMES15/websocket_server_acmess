const WebSocket = require('ws');

const port = process.env.PORT || 8080;

const server = new WebSocket.Server({ port });

console.log(`Servidor WebSocket corriendo en el puerto ${port}`);

server.on('connection', socket => {
  console.log('Usuario conectado');

  socket.on('message', message => {
    // Convertir mensaje (Buffer) a string legible
    const msgStr = message.toString();

    console.log('Mensaje recibido:', msgStr);

    // Reenviar el mensaje a todos los demás clientes conectados
    server.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(msgStr);
        console.log('Mensaje reenviado a un cliente:', msgStr);
      }
    });
  });

  socket.on('close', () => {
    console.log('Usuario desconectado');
  });
});
