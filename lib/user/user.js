/**
 * Module dependencies.
 */

var page = require('page');
var User = require('user-model');
var bus =require('bus');

bus.on('logout', loggedout);

/**
 * Instantiate and expose user
 */
var user = module.exports = new User();

user.load("me");

user.required = function(ctx, next) {
  if ("unloaded" === user.state()) {
    setTimeout(loggedout, 0);
  } else if ("loading" === user.state()) {
    user.once('error', loggedout);
  }
  user.ready(function() {
    user.off('error', loggedout);
    next();
  });
};

function loggedout () {
  user.logout();
  console.log('user logged out');
  page('/')
}
