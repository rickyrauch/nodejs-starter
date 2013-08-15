/**
 * Module dependencies.
 */

var Builder = require('component-builder')
  , templates = require('./templates')
  , fs = require('fs')
  , write = function(filename, data) {
    return fs.writeFileSync(filename, data, {flags: "a"});
  }

/**
 * Component builder middleware.
 */

module.exports = function(req, res, next) {
  var builder = new Builder('.');
  builder.copyFiles();
  builder.addLookup('lib');
  builder.copyAssetsTo('public');
  builder.use(templates);
  builder.build(function(err, res){
    console.log(err);
    if (err) return next(err);
    write('public/app.js', res.require + res.js);
    // write('public/app.css', res.css);
    next();
  });
};