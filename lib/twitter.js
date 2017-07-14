'use strict';

const requestPromise = require('request-promise-native');
const request = require('request');
const config = require('../config');
const twitterOauthGenerator = require('./twitterOauthGenerator');

const getAccessToken = async() => {
  const oauthUrl = 'https://api.twitter.com/oauth2/token';
  const oauthToken =
    new Buffer(config.twitterConsumerKey + ':' + config.twitterConsumerSecret).toString('base64');
  const oauthOptions = {
    method: 'POST',
    url: oauthUrl,
    headers: {
      'Authorization': 'Basic ' + oauthToken
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  const result = {};

  let response;

  try {
    response = await requestPromise(oauthOptions);
    result.accessToken = response.access_token;
  } catch (e) {
    response = e;
    result.statusCode = response.statusCode;
    result.error = true;
    result.message = response.error;
  }

  return result;
};

const getStatusesSample = () => {
  const statusesUrl = 'https://stream.twitter.com/1.1/statuses/sample.json';
  const statusesOptions = {
    method: 'GET',
    url: statusesUrl,
    oauth: {
      consumer_key: config.twitterConsumerKey,
      consumer_secret: config.twitterConsumerSecret,
      token: config.twitterToken,
      token_secret: config.twitterTokenSecret
    },
    json: true
  };

  const stream = request.get(statusesOptions);

  return stream;
};

module.exports = {
  getAccessToken: getAccessToken,
  getStatusesSample: getStatusesSample
};
