/**
 * Module dependencies.
 */

var builder = require('component-builder');
var resolve = require('component-resolver');
var jade = require('builder-jade');
var stylus = require('./stylus');
var fs = require('fs');
var write = fs.writeFileSync;
var debug = require('debug')('njs:build');

/**
 * Expose component
 * builder getter
 */

module.exports.build = build;

/**
 * Expose component
 * build middleware.
 */

module.exports.middleware = middleware;

/**
 * Creates a `Builder` instance
 * ready for build
 */

function build(next) {
  resolve(process.cwd(), {
    // install the remote components locally
    install: true
  }, function (err, tree) {
    if (err) throw err;

    builder.scripts(tree, {alias: true})
      .use('scripts', builder.plugins.js())
      .use('templates', jade({
        string: true,
      }))
      .use('jade', jade({
        runtime: false,
      }))
      .end(function (err, string) {
        if (err) throw err;
        fs.writeFileSync('public/app.js', builder.scripts.require + string);
      });

    builder.styles(tree)
      .use('styles', builder.plugins.css())
      .use('styles', stylus())
      .end(function (err, string) {
        if (err) throw err;
        fs.writeFileSync('public/app.css', string);
      });

    // only copy `images` to the build folder
    builder.files(tree, { destination: 'public' })
      .use('images', builder.plugins.symlink())
      .end(); // callback optional

    if (next) return next();
  });
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

  return build(next);
};