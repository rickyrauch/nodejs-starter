/**
 * Module dependencies.
 */

var template = require('./template');
var View = require('view');
var jwt = require('jwt');
var config = require('config');

module.exports = Homepage;

function Homepage() {
  if (!(this instanceof Homepage)) {
    return new Homepage();
  };

  View.call(this, template);
}

View(Homepage);

/**
 * Obsolete
 */
Homepage.prototype.redirect = function() {
  var target = jwt.getLoginUrl(config['redirectUrl']);
  window.location = target;
};