/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();
var favicon = require('serve-favicon');

/**
 * Set `views` directory for module
 */

app.set('views', __dirname);

/**
 * Set `view engine` to `jade`.
 */

app.set('view engine', 'jade');

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

require('lib/auth')(app);

/**
 * Load user routes
 * API service
 */

app.use("/api", require('lib/user'));

/**
 * GET index page.
 */

app.get('*', function(req, res) {
  res.render('index');
});