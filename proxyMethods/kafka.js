'use strict';

console.log('Using Kafka Proxy');

module.exports = () => {

  return new Promise((resolve, reject) => {

    const config = require('../config');
    const kafka = require('kafka-node');
    const client = new kafka.Client(config.zookeeper);
    const producer = new kafka.Producer(client);

    producer.on('ready', () => {
      console.log('Kafka producer ready to send');

      const startupPayload = [{
        topic: 'twitter-stream',
        messages: 'STREAM START: ' + new Date().getTime()
      }];

      producer.send(startupPayload, (err, data) => {
        if (err) console.log('Stream start message send failed: ', err);
        if (data) console.log('Stream start message send succeeded');
      });

      const proxyMethod = (tweet) => {

        const payload = [{
          topic: 'twitter-stream',
          messages: tweet
        }];

        producer.send(payload, () => {});
      };

      return resolve(proxyMethod);
    });

    producer.on('error', (err) => {
      console.log('Kafka producer errored : ', err);
      return reject(err);
    });
  });
};
