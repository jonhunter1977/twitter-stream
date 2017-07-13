'use strict';

const generateRandomRequestId = () => {
  const epoch = new Date().getTime().toString();
  return epoch;
};

module.exports = generateRandomRequestId;
