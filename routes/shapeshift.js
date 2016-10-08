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
        var dash = allCoins["DASH"];
        var dashName = allCoins["DASH"]["name"];
        var dashSymbol = allCoins["DASH"]["symbol"];
        var dashImage = allCoins["DASH"]["image"];
         res.send('<p><a class="btn btn-lg btn-success" href="' + dashImage + '" role="button">'+dashSymbol+'</a></p>');


        // res.render('shapeshift', {
        //     allCoins: allCoins
        // })
    });

});

module.exports = router;
