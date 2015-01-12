/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('passport');
var log = require('debug')('democracyos:auth:routes');

/**
 * Expose auth app
 */

var app = module.exports = express();

/**
 * Local Auth routes
 */

app.post('/login'
  , passport.authenticate('local', { failureRedirect: '/' })
  , function(req, res) {
    res.redirect('/');
  }
);

/**
 * Logout
 */

app.post('/logout'
  , function(req, res, next) {
    try {
      req.logout();
      log('Logging out citizen %s', req.user);
      res.send(200);
    } catch (err) {
      log('Failed to logout citizen: %s', err);
      res.send(500);
    }
  }
);