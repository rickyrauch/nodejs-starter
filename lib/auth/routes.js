/**
 * Module dependencies.
 */
 
var express = require('express')
var passport = require('passport')

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
  , function(req, res, next) {
    req.logout();
    res.redirect('/')
  }
);

/*
 * Facebook Auth routes
 */

app.get('/auth/facebook'
  , passport.authenticate('facebook', {
    scope: [ 'email', 'user_birthday', 'user_location', 'user_photos' ]
  })
);

app.get('/auth/facebook/callback'
  , passport.authenticate('facebook', { failureRedirect: '/' })
  , function(req, res) {
    // After successful authentication
    // redirect to homepage.
    res.redirect('/');
  }
);

/*
 * Twitter Auth routes
 */

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback'
  , passport.authenticate('twitter', { failureRedirect: '/' })
  , function(req, res) {
    // After successful authentication
    // redirect to homepage.
    res.redirect('/');
  }
);
