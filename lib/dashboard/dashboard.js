/**
 * Module dependencies.
 */

var page = require('page');
var o = require('dom');
var Dashboard = require('./view');

page('/', function(ctx, next) {
  var section = o('section.site-content').empty();
  var dashboard = new Dashboard();
  dashboard.appendTo(section[0]);
});