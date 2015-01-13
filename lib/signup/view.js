/**
 * Module dependencies.
 */

var render = require('render');
var bind = require('bind-methods');
var template = require('./template');
var autovalidate = require('autovalidate');
var autosubmit = require('autosubmit');

var View = render(template);
View
  .attr('success', { type: 'boolean', required: true, default: false })
  .attr('email', { type: 'string' });

/**
 * Hook in plugins
 */

View.use(autovalidate);
View.use(autosubmit);
View.use(bind(['onresponse']));

/**
 * Hook up binds
 */

View.on('mounted', function (view) {
  view.on('response', view.onresponse)
});

View.on('unmounted', function (view) {
  view.off('response', view.onresponse)
});

/**
 * Handle http response to show message to the user.
 *
 * @param err
 * @param res
 */

View.prototype.onresponse = function(err, res) {
  console.log(err, res);
};

module.exports = View;