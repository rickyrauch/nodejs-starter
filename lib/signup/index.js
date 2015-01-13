/**
 * Module dependencies.
 */

var express = require('express');
var t = require('t-component');
var User = require('lib/models').User;
var auth = User.authenticate();
var signup = require('./lib/signup');

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
  var meta = {
    ip: req.ip,
    ips: req.ips,
    host: req.get('host'),
    origin: req.get('origin'),
    referer: req.get('referer'),
    ua: req.get('user-agent')
  };

  signup.doSignUp(req.body, meta, function (err, citizen) {
    if (err) {
      return res.status(200).json({ error: err.message });
    };
    return res.sendStatus(200);
  })
});