/**
 * Module dependencies.
 */

var Builder = require('./builder');
var debug = require('debug')('platform:build');

/**
 * Expose component
 * builder getter
 */

module.exports.Builder = Builder;

/**
 * Expose component
 * build middleware.
 */

module.exports.middleware = middleware;

/**
 * Express build middleware
 */

function middleware (req, res, next) {
  // Build only script and stylesheet
  if (!/app\.(js|css)/.test(req.path)) {
    return next();
  }

  debug('Build %s.', req.path);

  var builder = new Builder();
  builder.build(function(err){
    next(err);
  });
}