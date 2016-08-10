/**
 * An error logger backed by Loggly
 */

require('dotenv').config({silent: false});

var loggly = require('loggly');

var client = loggly.createClient({
  token: process.env.LOGGLY_TOKEN,
  subdomain: process.env.LOGGLY_SUBDOMAIN,
  tags: ['error'],
  json: true
});

module.exports = client;
