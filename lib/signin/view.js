/*
 * Module dependencies.
 */

var user = require('user');
var dom = require('dom');
var FormView = require('form-view');
var template = require('./template');
var page = require('page');
var t = require('t');

/**
 * Expose SigninForm.
 */
module.exports = SigninForm;

/**
 * SigninForm
 *
 * @return {SigninForm} `SigninForm` instance.
 * @api public
 */

function SigninForm () {
  if (!(this instanceof SigninForm)) {
    return new SigninForm();
  }

  FormView.call(this, template);
}

/**
 * Inherit from `FormView`
 */

FormView(SigninForm);

SigninForm.prototype.switchOn = function () {
  this.on('success', this.bound('onSuccess'));
};

/**
 * Show success message
 */
SigninForm.prototype.onSuccess = function () {
  user.load('me');
  page('/');
};

/**
 * Handle http response to show message to the user.
 *
 * @returns {Mixed}
 * @override from {FormView}
 */
SigninForm.prototype.response = function (err, res) {
  if (err) {
    return this.errors([err]);
  }

  if (!res.ok) {
    return this.errors([res.text]);
  }

  //Redirect if come from unverified email
  //FIXME: this error detection mechanism is a little weird, we should avoid compare keys.
  if (res.ok && JSON.parse(res.text).error === t('signin.error.email-not-valid')) {
    page('/signup/resend-validation-email');
  }

  if (res.body && res.body.error) {
    return this.errors([res.body.error]);
  }

  this.emit('success', res);
};
