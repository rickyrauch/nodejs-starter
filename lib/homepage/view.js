/**
 * Module dependencies.
 */

var ripple = require('ripple');
var template = require('./template');

var View = new ripple(template());

module.exports = View;