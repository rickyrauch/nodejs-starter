/**
 * Module dependencies.
 */

var user = require('user');
var template = require('./template');
var View = require('view');

/**
 * Expose view
 */

 module.exports = UserBadgeView;

 /**
 * Create `UserBadgeView` container
 */

function UserBadgeView() {
  View.call(this, template, {user: user});
}

View(UserBadgeView);
