/**
 * Module dependencies.
 */
var page = require('page');
var title = require('title');
var SigninForm = require('./view');
var o = require('dom');
var t = require('t');

page('/signin', function(ctx, next) {

  // Update page title
  title(t('signin.title'));

  // Empty section
  var section = o('section.site-content').empty();

  // Create view instance and append it to section
  var signin = new SigninForm();
  signin.el.appendTo(section[0]);
});
