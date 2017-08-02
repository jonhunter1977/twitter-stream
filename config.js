module.exports = {
  twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
  twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  twitterToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
  twitterTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  proxyTo: 'KAFKA',
  zookeeper: '192.168.10.4:2181',
  kafkaOptions: {
    kafkaHost: '192.168.10.4:9092,192.168.10.4:9093,192.168.10.4:9094'
  }
};
