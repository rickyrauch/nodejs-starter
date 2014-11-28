/**
 * Module dependencies.
 */

var resolve = require('component-resolver');
var build = require('component-builder');
var stylus = require('./stylus');
var jade = require('builder-jade');
var mkdir = require('mkdirp');
var fs = require('fs');
var write = fs.writeFileSync;
var ready = require('ready').mixin;

/**
 * Constructor
 */

function Builder() {
  var self = this;

  resolve(process.cwd(), {
    // install the remote components locally
    install: false,
    root: 'public'
  }, function (err, tree) {
    if (err) console.log(err), process.exit(1);

    self.tree = tree;
    self.ready(true);
  });
}


/**
 * Add ready mixin
 */

ready(Builder.prototype);


/**
 * Write app.js, app.css and copy assets
 *
 * @param fn callback receiving error, if any
 */

Builder.prototype.build = function(fn) {
  var self = this;
  this.ready(onready);

  function onready() {
    mkdir('public');

    build.scripts(self.tree)
      .use('scripts', build.plugins.js())
      .use('json', build.plugins.json())
      .use('templates', jade({
        string: false,
        runtime: true
      }))
      .use('templates', build.plugins.string())
      .end(onscriptsend);

    function onscriptsend(err, js) {
      if (err) {
        if (fn) return fn(err);
        throw err;
      }
      write('public/app.js', build.scripts.require + jade.runtime + js);

      build.styles(self.tree)
        .use('styles', build.plugins.css())
        .use('styles', stylus())
        .use('styles', build.plugins.urlRewriter(''))
        .end(onstylesend);
    }

    function onstylesend(err, string) {
      if (err) {
        if (fn) return fn(err);
        throw err;
      }
      fs.writeFileSync('public/app.css', string);

      build.files(self.tree, {destination: 'public'})
      .use('images', build.plugins.copy())
      .use('files', build.plugins.copy())
      .end(onfilesend);
    }

    function onfilesend(err) {
      debugger;
      if (fn) return fn(err);
      if (err) throw err;
    }
  }
};


module.exports = Builder;