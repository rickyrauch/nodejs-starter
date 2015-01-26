/**
 * Module dependencies.
 */

var config = require('config');
var template = require('./template');
var View = require('view');
var jwt = require('jwt');

module.exports = InstanceView;

function InstanceView(locals) {
  if (!(this instanceof InstanceView)) {
    return new InstanceView(name);
  };

  View.call(this, template, locals);
}

View(InstanceView);