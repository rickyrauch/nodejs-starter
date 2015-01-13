/**
 * Module dependencies.
 */

var render = require('render');
var template = require('./template');
var autovalidate = require('autovalidate');

var View = render(template);
View
  .attr('success', { type: 'boolean', required: true, default: false })
  .attr('email', { type: 'string' });

/**
 * Hook in plugins
 */

View.use(autovalidate);

/**
 * Handle http response to show message to the user.
 *
 * @param err
 * @param res
 */

View.prototype.onsubmit = function(ev) {
  ev.preventDefault();

  this.success = true;
};

module.exports = View;