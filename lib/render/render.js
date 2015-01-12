/**
 * Module dependencies.
 */

var o = require('dom');
var ripple = require('ripple');
var merge = require('merge-util');
var removed = require('removed');

/**
 * Render default modules
 */

var user = require('user');
var translation = require('t');
var config = require('config');

exports = module.exports = render;
exports.dom = dom;

function render(template, options) {
  var defaults = {
    user: user,
    t: translation,
    config: config
  };

  var rendered = template(merge(defaults, options, { inheritance: true }));
  var View = ripple(rendered);
  View.use(onremove);
  return View;
}

function dom(template, options) {
  return o(render(template, options));
}

function onremove(View) {
  View.on('mounted', function (view) {
    var el = view.el;
    removed(el, function () {
      view.destroy();
    })
  });
}