/**
 * A request Logger that logs each req and res on loggly
 */

const  winston = require('winston');
require('winston-loggly-bulk');
const expressWinston = require('express-winston');
require('dotenv').config({silent: false});

module.exports = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.Loggly({
      token: process.env.LOGGLY_TOKEN,
      subdomain: process.env.LOGGLY_SUBDOMAIN,
      tags: ["node-loggly-request"], // optional tag to log with every logging call
      json:true
    })
  ],
  expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
  colorStatus: true // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
});
