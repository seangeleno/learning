var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
    var options = {
        method: 'GET',
        url: 'https://shapeshift.io/getcoins',
        json: true
    };
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        var allCoins = body;

        //Dash
        var dash = allCoins["DASH"];
        var dashName = dash["name"];
        var dashSymbol = dash["symbol"];
        var dashImage = dash["image"];
         //res.send('<p><a class="btn btn-lg btn-success" href="' + dashImage + '" role="button">'+dashSymbol+'</a></p>');
         //BTC
         var btc = allCoins["BTC"];
         var btcName = btc["name"];
         var btcSymbol = btc["symbol"];
         var btcImage = btc["image"];
         // Monero
         var xmr = allCoins["XMR"];
         var xmrName = xmr["name"];
         var xmrSymbol = xmr["symbol"];
         var xmrImage = xmr["image"];

         res.render('shapeshift', {
             dash: dash,
             dashName: dashName,
             dashSymbol: dashSymbol,
             dashImage: dashImage,
             xmr: xmr,
             xmrName: xmrName,
             xmrSymbol: xmrSymbol,
             xmrImage: xmrImage,
             btc: btc,
             btcName: btcName,
             btcSymbol: btcSymbol,
             btcImage: btcImage
         })
    });

});

module.exports = router;
