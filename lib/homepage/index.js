/**
 * Module dependencies.
 */

var config = require('lib/config');
var express = require('express');
var app = module.exports = express();

/**
 * GET index page.
 */

app.use('/', require('lib/layout'));