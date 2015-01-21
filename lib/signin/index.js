/**
 * Module dependencies.
 */

var express = require('express');
var t = require('t-component');
var User = require('lib/models').User;
var auth = User.authenticate();
var jwt = require('lib/jwt');

/**
 * Exports Application
 */

var app = module.exports = express();

/**
 * Add GET route
 */

app.get('/', require('lib/layout'));

/**
 * Define routes for SignUp module
 */

app.post('/', function(req, res, next) {
  auth(req.body.email, req.body.password, function (err, user, info) {
    if (err) {
      return res.json(200, { error: t(err.message) });
    }
    if (!user) {
      return res.json(200, { error: t(info.message) });
    }
    if (!user.emailValidated) {
      return res.json(200, { error: t('signin.error.email-not-valid') });
    }
    if (user.disabledAt) {
      return res.json(200, { error: t('signin.error.user-disabled') });
    }
    req.login(user, function(err) {
      if (err) return res.json(200, { error: t(err.message) });
      var token = jwt.encodeToken(user, app.get('jwtTokenSecret'));
      return res.json(200, token);
    })
  })
});