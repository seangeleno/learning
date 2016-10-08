var express = require('express');
var router = express.Router();
var request = require('request');

function refreshPage() {
    window.location.reload();
}

/* GET Cyrpto Currenty Exchange Data */
router.get('/', function(req, res) {
    var pairGet = {
        method: 'GET',
        url: 'http://shapeshift.io/marketinfo/btc_xmr',
        json: true // JSON stringifies the body automatically
    };
    var getCoins = {
        method: 'GET',
        url: 'shapeshift.io/getcoins',
        json: true // JSON stringifies the body automatically
    };
    //var shapeshiftPair = function(error, response, body) {
    request(getCoins, shapeshiftCoins);
    //request(pairGet, shapeshiftCoins);

     function shapeshiftCoins (error, response, body) {
        if (error) throw new Error(error);
        var allCoins = JSON.parse(body);
        var dash = allCoins["DASH"];
        var btc = allCoins["BTC"];
        var xmr = allCoins["XMR"];
        var ether = allCoins["ETH"];
        var doge = allCoins["DOGE"];
        var displayAllCoins = "<h1>Crypto Currencies: " + allCoins + "</h1>";

        //console.log(body);
        //console.log(pair);
        //res.send(message);
        res.render('shapeshift', {
          allCoins: allCoins,
           dash: dash,
          btc: btc,
          xmr: xmr,
          ether: ether,
          doge: doge
        })

      };
     function shapeshiftCoins2 (error, response, body) {
        if (error) throw new Error(error);
        var allCoins = JSON.parse(body);
        var dash = allCoins["DASH"];
        var btc = exchange["BTC"];
        var xmr = exchange["XMR"];
        var ether = exchange["ETH"];
        var doge = exchange["DOGE"];
        var displayAllCoins = "<h1>Crypto Currencies: " + allCoins + "</h1>";

        //console.log(body);
        //console.log(pair);
        //res.send(message);
        res.render('shapeshift', {
          allCoins: allCoins,
           dash: dash,
          btc: btc,
          xmr: xmr,
          ether: ether,
          doge: doge
        })

      };

    //res.send("<h1> why isn't this working :'( </h1>");
});

module.exports = router;
