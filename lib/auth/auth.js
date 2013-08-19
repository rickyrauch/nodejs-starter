/**
 * Module dependencies.
 */

var page = require('page');

page('/auth/twitter', replace());
page('/auth/facebook', replace());
page('/logout', replace());

/**
 * Page.js middleware for path
 * replacing
 *
 * @param {String} path
 * @return {Function} middleware
 * @api private
 */

function replace (path) {
  return function middleware (ctx, next) {
    path = path || ctx.path;
    window.location.replace(path);
  }
}