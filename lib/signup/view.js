/**
 * Module dependencies.
 */

var render = require('render');
var bind = require('bind-methods');
var template = require('./template');
var autovalidate = require('autovalidate');
var autosubmit = require('autosubmit');
var each = require('each');


var SignupView = render(template);

SignupView
  .attr('success', { type: 'boolean', required: true, default: false })
  .attr('errors', { type: 'array', required: true, default: [] });

/**
 * Hook in plugins
 */

SignupView.use(autovalidate);
SignupView.use(autosubmit);
SignupView.use(bind(['onresponse']));
SignupView.use(each);

/**
 * Hook up binds
 */

SignupView.on('mounted', function (view) {
  view.on('response', view.onresponse)
});

SignupView.on('unmounted', function (view) {
  view.off('response', view.onresponse)
});

/**
 * Handle http response to show message to the user.
 *
 * @param err
 * @param res
 */

SignupView.prototype.onresponse = function(err, res) {
  if (err) {
    return this.errors = [err];
  };
  if (!res.ok) {
    return this.errors = [res.text];
  };
  if (res.body && res.body.error) {
    return this.errors = [res.body.error];
  };

  this.success = true;
};

module.exports = SignupView;