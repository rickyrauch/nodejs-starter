/**
 * Module dependencies.
 */

var page = require('page');
var User = require('user-model');
var bus =require('bus');
var log = require('debug')('democracyos-platform:user');

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

/**
* Load user's data if logged in
*
* @param {Object} ctx page's context
* @param {Function} next callback after load
* @api private
*/

user.optional = function(ctx, next) {
  log('optional at path %s', ctx.path);
  ctx.user = user;

  if (!user.logged()) user.load('me');
  user.once('error', onerror);
  user.ready(onready);

  function onerror(err) {
    log('Found error %s', err);
    logout();
    log('unlogged user at path "%s"', ctx.path);
    next();
  }

  function onready() {
    user.off('error', onerror);
    log('logged user at path "%s"', ctx.path);
    next();
  }
};



/**
* Unloads user instance
*
* @api private
*/

function logout() {
  log('logging out citizen');
  if (user.logged()) user.unload();
}

function loggedout () {
  user.logout();
  console.log('user logged out');
  page('/')
}
