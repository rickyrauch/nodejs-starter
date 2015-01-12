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
 * GET index page.
 */

app.get('*', function(req, res) {
  res.render('index');
});