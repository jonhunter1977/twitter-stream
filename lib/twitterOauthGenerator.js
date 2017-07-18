'use strict';

const hmacsha1 = require('hmacsha1');
const config = require('../config');
const generateRandomRequestId = require('./generateRandomRequestId');

const twitterOauthGenerator = (urlBeingCalled) => {
  const oauth = {
    oauthConsumerKey: config.twitterConsumerKey,
    oauthNonce: generateRandomRequestId(),
    oauthSignatureMethod: 'HMAC-SHA1',
    oauthTimestamp: new Date().getTime(),
    oauthToken: config.twitterToken,
    oauthVersion: '1.0'
  };

  const oauthParameterString =
    'oauth_consumer_key=' + encodeURIComponent(oauth.oauthConsumerKey) + '&' +
    'oauth_nonce=' + encodeURIComponent(oauth.oauthNonce) + '&' +
    'oauth_signature_method=' + encodeURIComponent(oauth.oauthSignatureMethod) + '&' +
    'oauth_timestamp=' + encodeURIComponent(oauth.oauthTimestamp) + '&' +
    'oauth_token=' + encodeURIComponent(oauth.oauthToken) + '&' +
    'oauth_version=' + encodeURIComponent(oauth.oauthVersion);
    console.log('oauthParameterString = ');
  console.log(oauthParameterString);

  const oauthSignatureBaseString =
    'GET&' +
    encodeURIComponent(urlBeingCalled) + '&' +
    encodeURIComponent(oauthParameterString);
    console.log('oauthSignatureBaseString = ');
  console.log(oauthSignatureBaseString);

  const consumerSecretSigned = encodeURIComponent(config.twitterConsumerSecret);
  const tokenSecretSigned = encodeURIComponent(config.twitterTokenSecret);
  const signingKey = consumerSecretSigned + '&' + tokenSecretSigned;
  console.log('signingKey = ');
  console.log(signingKey);

  const oauthSignature = hmacsha1(signingKey, oauthSignatureBaseString);
  console.log('oauthSignature = ');
  console.log(oauthSignature);

  const oauthHeader =
    'OAuth ' +
    'oauth_consumer_key="' + encodeURIComponent(oauth.oauthConsumerKey) + '", ' +
    'oauth_nonce="' + encodeURIComponent(oauth.oauthNonce) + '", ' +
    'oauth_signature="' + encodeURIComponent(oauthSignature) + '", ' +
    'oauth_signature_method="' + encodeURIComponent(oauth.oauthSignatureMethod) + '", ' +
    'oauth_timestamp="' + encodeURIComponent(oauth.oauthTimestamp) + '", ' +
    'oauth_token="' + encodeURIComponent(oauth.oauthToken) + '", ' +
    'oauth_version="' + encodeURIComponent(oauth.oauthVersion) + '"';

  return oauthHeader;

};

module.exports = twitterOauthGenerator;
