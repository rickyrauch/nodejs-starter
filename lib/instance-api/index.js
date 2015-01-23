/**
 * Module dependencies.
 */

var express = require('express');

/**
 * Exports Application
 */

var app = module.exports = express();

/**
 * Define routes for Dashboard module
 */

app.get('/', function(req, res, next) {
  var instances = [
    { id: 1, name: 'My instance', url: '', signinUrl: '' }
  ];

  return res.status(200).json(instances);
});