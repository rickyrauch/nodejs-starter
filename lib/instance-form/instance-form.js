/**
 * Module dependencies.
 */

var page = require('page');
var o = require('dom');
var InstanceForm = require('./view');
var Success = require('./success-view');

page('/instance/new', function(ctx, next) {
  var section = o('section.site-content').empty();
  var instance = new InstanceForm();
  instance.appendTo(section[0]);
});

page('/instance/new/success/:id', function(ctx, next) {
  ctx.state.id = ctx.params.id;
  var section = o('section.site-content').empty();
  var success = new Success(ctx);
  success.appendTo(section[0]);
});