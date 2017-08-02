'use strict';

const config = require('../config');

module.exports = async() => {
  let proxyInitMethod;
  if (config.proxyTo === 'KAFKA') {
    proxyInitMethod = require('./kafka.js');
  } else {
    proxyInitMethod = require('./socket.js');
  }

  let proxyMethod;
  try {
    proxyMethod = await proxyInitMethod();
  } catch (e) {
    proxyMethod = Promise.reject('No proxy method was set up');
  }

  return proxyMethod;

};
