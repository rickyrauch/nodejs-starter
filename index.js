/**
 * Module dependencies.
 */

var http = require('http');
var express = require('express');
var app = module.exports = express();
var debug = require('debug')('njs');

/**
 * Config application
 */

require('./config')(app);

/**
 * Link models with
 * mongoDB database
 */

require('models')(app);

/**
 * Load auth routes and
 * login strategies with
 * passport
 */

require('auth')(app);

/**
 * Load user routes
 * API service
 */

app.use("/api", require('user'));

/**
 * Application Booting
 */

app.use(require('boot'));

/**
 * Launch server
 */

http.createServer(app).listen(app.get('port'), function() {
  debug('Application started on port %d', app.get('port'));
});