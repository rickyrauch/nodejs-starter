/**
 * Module dependencies.
 */

var config = require('lib/config');
var express = require('express');
var app = module.exports = express();

/**
 * GET Add/edit Instance form.
 */

app.use('/instance/new', require('lib/layout'));