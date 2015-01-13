/**
 * Module dependencies.
 */
var page = require('page');
var Signin = require('./view');
var o = require('dom');

page('/signin', function(ctx, next) {
  var section = o('section.site-content').empty();
  var singin = new Signin();
  singin.appendTo(section[0]);
});