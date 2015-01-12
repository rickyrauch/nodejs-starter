/**
 * Module dependencies.
 */

var o = require('dom');
var ripple = require('ripple');
var merge = require('merge-util');

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
  return new ripple(rendered);
}

function dom(template, options) {
  return o(render(template, options));
}
