var express = require('express');
var router = express.Router();
var request = require('request');

function refreshPage() {
    window.location.reload();
}

router.get('/', function(req, res) {
    var options = {
        method: 'GET',
        url: 'http://api.coindesk.com/v1/bpi/currentprice/USD.json',
        json: true // JSON stringifies the body automatically
    };
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        // res.send(displayText);
        var btcPrice = body;
        var displayText = btcPrice["bpi"]["USD"]["rate"];
        var updatedTime = btcPrice["time"]["updated"];
        var disclaimer = btcPrice["disclaimer"];

        res.render('bitcoin', {
            displayText: displayText,
            updatedTime: updatedTime,
            disclaimer: disclaimer
        })
    });
    /* GET Bitcoin Data */
    //res.send(displayText);
});

module.exports = router;
