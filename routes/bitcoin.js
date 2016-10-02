const express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('welcome to the bitcoin response')
})

module.exports = router;
