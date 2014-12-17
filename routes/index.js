var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { newRap: 'RapGoesHere' });
});

module.exports = router;
