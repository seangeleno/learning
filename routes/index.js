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
  passport.authenticate('auth0', { failureRedirect: '/seangeleno.auth0.com' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });

module.exports = router;
