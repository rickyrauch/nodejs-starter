/**
 * Module dependencies.
 */

var page = require('page');
var o = require('dom');
var InstanceForm = require('./view');
var Success = require('./success-view');
var title = require('title');
var t = require('t');

page('/instance/new', function(ctx, next) {
  title(t('instance.new.title'));

  var section = o('section.site-content').empty();
  var instance = new InstanceForm();
  instance.appendTo(section[0]);
});

page('/instance/new/success/:id', function(ctx, next) {
  title(t('instance.success.title'));

  var section = o('section.site-content').empty();
  var success = new Success(ctx);
  success.appendTo(section[0]);
});