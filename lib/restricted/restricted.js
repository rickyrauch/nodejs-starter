/**
 * Module dependencies.
 */

var page = require('page');
var domify = require('domify');
var user = require('user');
var empty = require('empty');
var area51 = require('./area51');

/**
 * Define Area51's restricted route
 */

page('/restricted', user.required, function(ctx, next) {
  var container = document.querySelector('section.site-content');

  empty(container)
    .appendChild(domify(area51({
      user: user
    })));
});
