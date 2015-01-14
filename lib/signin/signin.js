/**
 * Module dependencies.
 */
var page = require('page');
var SigninForm = require('./view');
var o = require('dom');

page('/signin', function(ctx, next) {
  var section = o('section.site-content').empty();
  var singin = new SigninForm();
  singin.el.appendTo(section[0]);
});
