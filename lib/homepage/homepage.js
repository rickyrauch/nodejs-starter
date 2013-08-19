/**
 * Module dependencies.
 */

var page = require('page');
var domify = require('domify');
var splash = require('./splash');

page('/', function(ctx, next) {
  document
  .querySelector('section.site-content')
  .appendChild(domify(splash()));
});