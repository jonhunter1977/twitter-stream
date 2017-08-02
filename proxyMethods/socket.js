'use strict';

console.log('Using Socket Proxy');

module.exports = () => {
  return new Promise((resolve) => {

    const socketServer = require('../lib/socketServer');

    const proxyMethod = (tweet) => {
      socketServer.broadcast(tweet);
    };

    return resolve(proxyMethod);
  });
};
