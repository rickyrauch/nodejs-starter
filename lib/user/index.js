/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express();
var User = mongoose.model('User');

app.get("/users/me", function(req, res, next) {
  if (req.isAuthenticated()) return res.json(req.user);
  res.json({});
});