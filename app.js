/* EXPRESS JS MODULE IMPORT + INSTANTIATION */
var express = require('express');
var app = express();

/* SETUP MIDDLEWARE GOES HERE */
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* Template Engine: SWIG - 1/2 */
var swig = require('swig');

/* API Calls with Request */
var request = require('request');

/* Auth0 + Passport */
var session = require('express-session');
var dotenv = require('dotenv');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
dotenv.load();

/* MONGODB NON-RELATIONAL DATABASE */
var mongoose = require('mongoose');
var config = require('./config/config.js');
var base58 = require('./base58.js');

/* Routing */
var routes = require('./routes/index');
var user = require('./routes/user');
var bitcoin = require('./routes/bitcoin');
var shapeshift = require('./routes/shapeshift');

/* Configure Passport to use Auth0 - This will configure Passport to use Auth0 */
 var strategy = new Auth0Strategy({
     domain:       process.env.AUTH0_DOMAIN,
     clientID:     process.env.AUTH0_CLIENT_ID,
     clientSecret: process.env.AUTH0_CLIENT_SECRET,
     callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
   }, function(accessToken, refreshToken, extraParams, profile, done) {
     // accessToken is the token to call Auth0 API (not needed in the most cases)
     // extraParams.id_token has the JSON Web Token
     // profile has all the information from the user
     return done(null, profile);
   });
 passport.use(strategy);

 /* Passport Serialize + Deserialize */
 passport.serializeUser(function(user, done) {
   done(null, user);
 });
 passport.deserializeUser(function(user, done) {
   done(null, user);
 });

/* Template Engine: SWIG 2/2 */
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

/*  */
app.use(logger('dev'));

/*  */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

/* Passport Middleware Start */
app.use(session({
  secret: 'pinkmanthedog',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
/* Passport Middleware End */

/* Routing */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/user', user);
app.use('/bitcoin', bitcoin);
app.use('/shapeshift', shapeshift);
app.use('/urlshort', urlshortener);

/* ERROR HANDLERS */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
/* ERROR HANDLERS END */

module.exports = app;
