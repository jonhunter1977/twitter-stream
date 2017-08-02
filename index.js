'use strict';

const getProxyMethod = require('./proxyMethods');
const getStatusesSample = require('./lib/twitter').getStatusesSample;

console.log('Set up proxy method');

getProxyMethod().then(proxyMethod => {

    const statusSampleStream = getStatusesSample();

    statusSampleStream
      .on('response', (response) => {
        console.log('Response received : ' + response.statusCode);
        if (response.statusCode === 401) {
          console.log('Authentication failed');
          process.exit();
        }
      })
      .on('data', (data) => {
        const twitterData = data.toString('UTF8');
        try {
          const jsonData = JSON.parse(twitterData);
          if (jsonData.text) {
            proxyMethod(JSON.stringify(jsonData));
          }
        } catch (e) {
          // console.error('Unable to parse data');
        }
      })
      .on('error', (err) => {
        console.log('Error on stream : ', err);
      });
  })
  .catch(error => {
    console.log('There was an error: ', error);
    process.exit();
  });
