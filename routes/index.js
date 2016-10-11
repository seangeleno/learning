var express = require('express');
var router = express.Router();
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var ensureLoggedIn = require('connect-ensure-login');

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* POST api/shorten */
router.post('/api/shorten', function (req, res) {
  var longUrl = req.body.url;
  var shortUrl = ''; // shortened URL will be returned

  // Check if url already exists in databse
  Url.findOne({long_url: longUrl}, function (err, doc) {
    if (doc) {
      // base58 encode the unique _id of that document and construct the short URL
      shortUrl = config.webhost + base58.encode(doc._id);

      res.send({'shortUrl': shortUrl});
    } else {
      // The long URL was not found in the long_url field in our urls
     // collection, so we need to create a new entry
     var newUrl = Url({
       long_url: longUrl
     });

     //save new link
     newUrl.save(function (err) {
       if (err) {
         console.error(err);
       }

       // construct the short URL
       shortUrl = config.webhost + base58.encode(newUrl._id);

       res.send({'shortUrl': shortUrl});
     });
   }
   
  });

});

router.get('/:encoded_id', function (req, res) {
  // route to redirecft the visitor to their original URL given the short URL
  res.send('SEND RESPONSE')
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Learning Express, MongoDB and Swig' , env: env});
});

// Render Login Template
router.get('/login', function (req, res) {
  res.render('login', {env: env})
});

// Perform session logout and redirect to homepage
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/seangeleno.auth0.coms' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });

module.exports = router;
