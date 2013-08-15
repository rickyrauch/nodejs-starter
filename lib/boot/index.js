/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();

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

app.use(express.favicon(__dirname + '/images/favicon.ico'));

/**
 * GET index page.
 */

app.get('*', function(req, res) {
  res.render('index');
});