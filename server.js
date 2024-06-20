// Importar las dependencias necesarias
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Crear la aplicación Express y el servidor HTTP
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Habilitar el acceso al directorio público
app.use(express.static(path.join(__dirname, 'public')));

// Escuchar cuando un cliente se conecta
io.on('connection', (socket) => {
  // Mostrar un mensaje cuando se conecta un usuario
  console.log('a user connected');
  
  // Escuchar cuando un usuario se desconecta
  socket.on('disconnect', () => {
    // Mostrar un mensaje cuando se desconecta un usuario
    console.log('user disconnected');
  });

  // Escuchar cuando un mensaje se envía
  socket.on('chat message', (msg) => {
    // Emitir el mensaje a todos los usuarios conectados
    io.emit('chat message', msg);
  });
});

// Asignar el puerto y iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  // Mostrar un mensaje cuando el servidor se está ejecutando
  console.log(`Server is running on port ${PORT}`);
});

