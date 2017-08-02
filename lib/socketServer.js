'use strict';

const net = require('net');

let listOfConnectedClients = [];

net.createServer((client) => {

  client.name = client.remoteAddress + ':' + client.remotePort;
  listOfConnectedClients.push(client);
  console.log(client.name, ' : connected');

  // Remove the client from the list when it leaves
  client.on('end', function() {
    listOfConnectedClients.splice(listOfConnectedClients.indexOf(client), 1);
    console.log(client.name, ' : disconnected');
  });
}).listen(5000);

console.log('Socket server running at port 5000\n');

module.exports = {
  broadcast: (message) => {
    listOfConnectedClients.forEach(function(client) {
      client.write(message + '\n');
    });
  }
};
