/**
 * Module dependencies.
 */

var Builder = require('component-builder');
var stylus = require('component-stylus-plugin');
var jade = require('./jade');
var fs = require('fs');
var write = fs.writeFileSync;
var debug = require('debug')('njs:build');

/**
 * Expose component
 * builder getter
 */

module.exports.createBuilder = createBuilder;

/**
 * Expose component
 * build middleware.
 */

module.exports.middleware = middleware;

/**
 * Creates a `Builder` instance
 * ready for build
 */

function createBuilder () {
  var builder = new Builder('.');
  builder.copyFiles();
  builder.addLookup('lib');
  builder.copyAssetsTo('public');
  builder.use(jade);
  builder.use(stylus);

  return builder;
}

/**
 * Express build middleware
 */

function middleware (req, res, next) {
  // Build only script and stylesheet
  if (!/app\.(js|css)/.test(req.path)) {
    return next();
  };

  debug('Build %s.', req.path);

  var builder = createBuilder();
  builder.build(function(err, res){
    if (err) return next(err);

    debug('Write script and stylesheet');
    write('public/app.js', res.require + res.js);
    write('public/app.css', res.css);
    next();
  });
};