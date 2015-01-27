/*
 * Module dependencies.
 */

var View = require('view');
var config = require('config');
var template = require('./success-template');
var page = require('page');
var jwt = require('jwt');
var t = require('t');

/**
 * Expose Success.
 */
module.exports = Success;

/**
 * Success
 *
 * @return {Success} `Success` instance.
 * @api public
 */

function Success (ctx) {
  if (!(this instanceof Success)) {
    return new Success(id);
  }

  var url = ctx.state.url || jwt.getLoginUrl(config['redirectUrl']);
  View.call(this, template, { url: url });

  this.back = this.find('.back');
}

/**
 * Inherit from `FormView`
 */

View(Success);

Success.prototype.switchOn = function() {
  this.back.on('click', this.bound('onback'));
};

Success.prototype.onback = function() {
  page('/');
};