/**
 * Module dependencies.
 */

var express = require('express');
var t = require('t-component');
var User = require('lib/models').User;
var auth = User.authenticate();

/**
 * Exports Application
 */

var app = module.exports = express();

/**
 * Add GET route
 */

app.get('/', require('lib/layout'));