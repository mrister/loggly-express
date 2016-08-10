var express = require('express');
var router = express.Router();

router.post('*', function(req, res) {
  var body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  // do something useful like log, close the offending route, start throttling affected route etc.
   console.log('[ALERT]: We got ' + body['num_hits'] + ' hits. Please contact ' + body['owner_email']+ ' and let him take a look at ' + body['search_link']);
  // yeah we got it
  res.sendStatus(200);
});

module.exports = router;

