/**
 * Module dependencies.
 */

var config = require('config');
var template = require('./template');
var View = require('view');
var InstanceView = require('instance-view');
var request = require('request');
var page = require('page');
var jwt = require('jwt');
var log = require('debug')('platform:dashboard');

module.exports = Dashboard;


function Dashboard() {
  if (!(this instanceof Dashboard)) {
    return new Dashboard();
  };

  View.call(this, template);

  /**
   * DOM elements
   */

  this.elInstances = this.el.find('.instances')[0];
  this.elNew = this.el.find('.btn.new');

  /**
   * View model
   */

  this.instances = [];

  /**
   * Startup
   */

  this.initialize();
}

View(Dashboard);

Dashboard.prototype.switchOn = function() {
  this.on('fetch', this.bound('load'));
  this.elNew.on('click', this.bound('onnew'));
};

Dashboard.prototype.initialize = function() {
  this.fetch();
};

Dashboard.prototype.fetch = function() {
  var view = this;
  request
  .get('/instances')
  .end(function(err, res) {
    if (err || !res.ok) return log('Found error %o', err || res.error);

    view.instances = JSON.parse(res.text);
    view.emit('fetch');
  });
};

Dashboard.prototype.load = function() {
  for (var i in this.instances) {
    var v = this.instances[i];
    var url = config['redirectUrl'] ? config['redirectUrl'] : v.url;
    url = jwt.getLoginUrl(url);
    var instance = new InstanceView({ title: v.title, summary: v.summary, url: url });
    this.elInstances.appendChild(instance.render()[0]);
  }
};

Dashboard.prototype.onnew = function() {
  page('/instance/new');
};