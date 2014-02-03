/**
 * Module dependencies.
 */
 
var express = require('express');
var passport = require('passport');
var debug = require('debug')('njs:auth:routes');

/**
 * Lazy create app
 */

var app;

/**
 * Expose auth app
 */

module.exports = app = express();

/**
 * Logout
 */

app.get('/logout'
  , logout
  , function (req, res, next) {
    res.redirect('/');
  }
);

/*
 * Facebook Auth routes
 */

app.get('/auth/facebook'
  , logout
  , passport.authenticate('facebook', {
    scope: [ 'email', 'user_birthday', 'user_location', 'user_photos' ]
  })
);

app.get('/auth/facebook/callback'
  , passport.authenticate('facebook', { failureRedirect: '/' })
  , function(req, res) {
    // After successful authentication
    // redirect to homepage.
    debug('Log in user %s', req.user.id);
    res.redirect('/restricted');
  }
);

/*
 * Twitter Auth routes
 */

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback'
  , logout
  , passport.authenticate('twitter', { failureRedirect: '/' })
  , function(req, res) {
    // After successful authentication
    // redirect to homepage.
    debug('Log in user %s', req.user.id);
    res.redirect('/restricted');
  }
);

/**
 * Logs user out
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @api private
 */

function logout (req, res, next) {
  if (req.user) {
    debug('Log out user %s', req.user.id);
    req.logout();
  }
  next();
}