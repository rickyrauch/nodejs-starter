/**
 * Module dependencies.
 */

var page = require('page');
var o = require('dom');
var Homepage = require('./view');

page('/', function(ctx, next) {
  var section = o('section.site-content').empty();
  var homepage = new Homepage();
  homepage.appendTo(section[0]);
});