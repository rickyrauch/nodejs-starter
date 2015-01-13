/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();
var favicon = require('serve-favicon');

/**
 * middleware for favicon
 */

app.use(favicon(__dirname + '/images/favicon.ico'));

/**
 * Config application
 */

require('lib/setup')(app);

/**
 * Link models with
 * mongoDB database
 */

require('lib/models')(app);

/**
 * Load auth routes and
 * login strategies with
 * passport
 */

app.use(require('lib/auth'));

/**
 * Load user routes
 * API service
 */

app.use("/api", require('lib/user'));

/**
 * GET homepage
 */

app.get('/', require('lib/homepage'));

/**
 * Signin page
 */

app.use('/signin', require('lib/signin'));

/**
 * Signup page
 */

app.use('/signup', require('lib/signup'));

/**
 * or else send 404
 */

app.get('*', function (req, res) {
  res.sendStatus(404);
})