/**
* Module dependencies.
*/

var page = require('page');
var user = require('user');
var t = require('t');
var SignupForm = require('./signup-form-view');
var EmailValidationForm = require('./email-validation-form-view');
var EmailValidationCompleteForm = require('./email-validation-complete-view');
var ResendValidationEmailForm = require('./resend-validation-email-form-view');
var title = require('title');

page('/signup',function(ctx, next) {
  // Build form view with options
  var form = SignupForm();

  // Empty container and render form
  form.replace('section.site-content');
});

page('/signup/validate/:token', function(ctx, next) {
  // Build form view with options
  var form = EmailValidationForm(ctx.params.token);

  form.replace('section.site-content');
});

page('/signup/validated', user.required, function(ctx, next) {
  // Build form view with options
  var form = EmailValidationCompleteForm();

  form.replace('section.site-content');
});

page('/signup/resend-validation-email', function(ctx, next) {
  // Build form view with options
  var form = new ResendValidationEmailForm();

  // Update page's title
  title(t('Resend validation email'));

  // Empty container and render form
  form.replace('section.site-content');
});
