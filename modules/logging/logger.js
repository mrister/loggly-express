/**
 * A general purpose logger based on loggly
 */

require('dotenv').config({silent: false});

var loggly = require('loggly');

var client = loggly.createClient({
  token: process.env.LOGGLY_TOKEN,
  subdomain: process.env.LOGGLY_SUBDOMAIN,
  //
  // Optional: Tag to send with EVERY log message
  //
  tags: ['node-loggly-logger'],
  json: true
});

module.exports = client;
