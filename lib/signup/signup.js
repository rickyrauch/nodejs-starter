/**
* Module dependencies.
*/

var page = require('page');
var SignupForm = require('./view');

page('/signup',function(ctx, next) {
  // Build form view with options
  var form = SignupForm();

  // Empty container and render form
  form.replace('section.site-content');
});
