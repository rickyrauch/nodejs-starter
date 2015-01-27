/**
 * Module dependencies.
 */

var page = require('page');
var o = require('dom');
var title = require('title');
var Dashboard = require('./view');
var t = require('t');

page('/', function(ctx, next) {
  title(t('dashboard.title'));

  var section = o('section.site-content').empty();
  var dashboard = new Dashboard();
  dashboard.appendTo(section[0]);
});