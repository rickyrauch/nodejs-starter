/**
 * Module dependencies.
 */

var page = require('page');
var user = require('user');

/**
 * Boot components
 */

require('homepage');

page('/restricted', user.required, function(ctx, next) {
  console.log("got to restricted with %o", ctx);
});

/**
 * Boot page.js
 */

page();