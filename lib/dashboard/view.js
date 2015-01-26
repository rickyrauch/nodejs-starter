/**
 * Module dependencies.
 */

var config = require('config');
var template = require('./template');
var View = require('view');
var InstanceView = require('instance-view');
var request = require('request');
var jwt = require('jwt');
var log = require('debug')('platform:dashboard');

module.exports = Dashboard;

function Dashboard() {
  if (!(this instanceof Dashboard)) {
    return new Dashboard();
  };

  View.call(this, template);

  this.elInstances = this.el.find('.instances')[0];
  this.instances = [];
  this.load();
}

View(Dashboard);

Dashboard.prototype.load = function() {
  var view = this;
  request
  .get('/instances')
  .end(function(err, res) {
    if (err || !res.ok) return log('Found error %o', err || res.error);

    view.instances = JSON.parse(res.text);

    for (var i in view.instances) {
      var v = view.instances[i];
      var url = config['redirectUrl'] ? config['redirectUrl'] + '/signin/' + jwt.getToken() : v.url;
      var instance = new InstanceView({ title: v.name, summary: v.summary, url: url });
      view.elInstances.appendChild(instance.render()[0]);
    }
  });
};