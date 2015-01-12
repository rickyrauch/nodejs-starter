/**
 * Module dependencies.
 */

var render = require('render');
var template = require('./template');
var View = render(template);
var Headroom = require('headroom');
var o = require('dom');

/**
 * Expose view
 */

module.exports = View;

View.directive('headroom', {
  bind: function(el, view) {
    view.headroom = new Headroom(el);
    view.headroom.init();
  },
  update: function(value, el, view) {

  },
  unbind: function(el, view){
    view.headroom.destroy();
  }
});