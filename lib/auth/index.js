/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();
var routes = require('./routes');

/**
 * Instantiates PassportJS midlewares
 */

require('./strategy')


/**
 * Attach routes to parent application
 */

app.use(routes);