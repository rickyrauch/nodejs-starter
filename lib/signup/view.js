/**
 * Module dependencies.
 */

var bind = require('bind-methods');
var render = require('render');
var template = require('./template');

var View = render(template);

/**
 * Hook in plugins
 */

View.use(bind('onresponse'));

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