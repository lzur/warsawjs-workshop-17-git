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

let checkins = {
  count: 0
};
io.on('connection', function(socket) {
  let clientCheckedIn = false;
  // Send the current state to the client immediately:
  socket.emit('update', checkins);
  // Wait for check-ins, update state and broadcast:
  socket.on('checkin', function() {
    // Guard clause: do not count the same client twice.
    if (clientCheckedIn) {
      return;
    }
    clientCheckedIn = true;
    checkins.count += 1;
    io.emit('update', checkins);
  });
});

server.listen(process.env.HTTP_PORT || 3000);
