/**
 * Module dependencies.
 */

var template = require('./template');
var View = require('view');

module.exports = Dashboard;

function Dashboard() {
  if (!(this instanceof Dashboard)) {
    return new Dashboard();
  };

  View.call(this, template);
}

View(Dashboard);
