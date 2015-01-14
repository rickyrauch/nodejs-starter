/**
 * Module dependencies.
 */

var template = require('./template');
var View = require('view');

module.exports = Homepage;

function Homepage() {
  if (!(this instanceof Homepage)) {
    return new Homepage();
  };

  View.call(this, template);
}

View(Homepage);
