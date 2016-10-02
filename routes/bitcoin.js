var express = require('express');
var router = express.Router();
var request = require('request');

/* GET Bitcoin Data */
router.get('/', function(req, res) {
    var options = {
        method: 'GET',
        url: 'http://api.coindesk.com/v1/bpi/currentprice/USD.json'
    };
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        // var displayText = "<h1>Current Bitcoin Price: " + body["bpi"]["USD"]["rate"] + "</h1>";
        // res.send(displayText);
        var btcPrice = JSON.parse(body);
        res.send("<h1>Current Bitcoin Price: " + btcPrice["bpi"]["USD"]["rate"] + "</h1>");
    });
});

module.exports = router;
