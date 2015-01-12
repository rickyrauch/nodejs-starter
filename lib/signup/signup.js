/**
 * Module dependencies.
 */

var page = require('page');
var o = require('dom');
var Signup = require('./view');

page('/signup', function(ctx, next) {
  var section = o('section.site-content').empty();
  var signup = new Signup();
  signup.appendTo(section[0]);
});