/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express();
var User = mongoose.model('User');
var restrict = require('lib/utils').restrict;

app.get("/users/me", restrict, function(req, res, next) {
  if (req.isAuthenticated()) return res.json(req.user);
  res.json({});
});