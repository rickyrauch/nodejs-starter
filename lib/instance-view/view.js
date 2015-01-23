/**
 * Module dependencies.
 */

var config = require('config');
var template = require('./template');
var View = require('view');
var jwt = require('jwt');

module.exports = InstanceView;

function InstanceView(name, url) {
  if (!(this instanceof InstanceView)) {
    return new InstanceView(name);
  };

  View.call(this, template, { name: name, url: url });
}

View(InstanceView);