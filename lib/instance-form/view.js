/*
 * Module dependencies.
 */

var dom = require('dom');
var FormView = require('form-view');
var template = require('./template');
var page = require('page');
var t = require('t');

/**
 * Expose InstanceForm.
 */
module.exports = InstanceForm;

/**
 * InstanceForm
 *
 * @return {InstanceForm} `InstanceForm` instance.
 * @api public
 */

function InstanceForm () {
  if (!(this instanceof InstanceForm)) {
    return new InstanceForm();
  }

  FormView.call(this, template);
}

/**
 * Inherit from `FormView`
 */

FormView(InstanceForm);

InstanceForm.prototype.switchOn = function() {
  this.on('success', this.bound('onsuccess'));
};

InstanceForm.prototype.onsuccess = function(res) {
  var instance = JSON.parse(res.text);
  page('/instance/new/success/'  + instance.id);
};