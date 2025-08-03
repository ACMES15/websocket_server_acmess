const WebSocket = require('ws');

const server = new WebSocket.Server({ port: process.env.PORT || 8080 });

server.on('connection', socket => {
  console.log('Cliente conectado');

  socket.on('message', message => {
    console.log('Mensaje recibido:', message);
    // Reenvía a todos los clientes conectados
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('Cliente desconectado');
  });
});
