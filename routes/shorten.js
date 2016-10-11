var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var base58 = require('../base58.js');
var config = require('../config/config.js');

router.get('/', function(req, res){
  res.render('shorten');
});

/* GET :encoded_id */
router.get('/:encoded_id', function(req, res) {

    var base58Id = req.params.encoded_id;

    var id = base58.decode(base58Id);

    // check if url already exists in database
    Url.findOne({
        _id: id
    }, function(err, doc) {
        if (doc) {
            res.redirect(doc.long_url);
        } else {
            res.redirect(config.webhost);
        }
    });

});

/* POST shorten */
router.post('shorten', function(req, res) {
    var longUrl = req.body.url;
    var shortUrl = '';

    // check if url already exists in database
    Url.findOne({
        long_url: longUrl
    }, function(err, doc) {
        if (doc) {
            shortUrl = config.webhost + base58.encode(doc._id);

            // the document exists, so we return it without creating a new entry
            res.send({
                'shortUrl': shortUrl
            });
        } else {
            // since it doesn't exist, let's go ahead and create it:
            var newUrl = Url({
                long_url: longUrl
            });

            // save the new link
            newUrl.save(function(err) {
                if (err) {
                    console.log(err);
                }

                shortUrl = config.webhost + base58.encode(newUrl._id);

                res.send({
                    'shortUrl': shortUrl
                });
            });
        }

    });
});


module.exports = router;
