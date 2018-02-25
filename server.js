'use strict';

// Requires:
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// Init:
const app = express();
const server = http.Server(app);
const io = socketio(server);
app.use(express.static('public'));
app.get('/status', function(req, res) {
  res.send({ ok: true });
});
server.listen(process.env.HTTP_PORT || 3000);
