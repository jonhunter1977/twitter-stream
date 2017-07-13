'use strict';

// const getAccessToken = require('./lib/twitter').getAccessToken;
//
// getAccessToken()
//   .then((getAccessTokenResult) => {
//     console.log(getAccessTokenResult);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const getStatusesSample = require('./lib/twitter').getStatusesSample;

const statusSampleStream = getStatusesSample();
statusSampleStream
  .on('response', (response) => {
    console.log('Response received : ' + response.statusCode);
  })
  .on('data', (data) => {
    const twitterData  = data.toString('UTF8');
    try {
      const jsonData = JSON.parse(twitterData);
      if (jsonData.text) console.log(jsonData.text);
    } catch (e) {
      // console.error('Unable to parse data');
    }
  });
