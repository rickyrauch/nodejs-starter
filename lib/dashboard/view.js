/**
 * Module dependencies.
 */

var config = require('config');
var template = require('./template');
var View = require('view');
var request = require('request');
var jwt = require('jwt');
var log = require('debug')('platform:dashboard');

module.exports = Dashboard;

function Dashboard() {
  if (!(this instanceof Dashboard)) {
    return new Dashboard();
  };

  View.call(this, template);

  this.instances = this.el.find('.instances')[0];
  this.load();
}

View(Dashboard);

Dashboard.prototype.load = function() {
  var view = this;
  request
  .get('/instances')
  .end(function(err, res) {
    if (err || !res.ok) return log('Found error %o', err || res.error);

    var instances = JSON.parse(res.text);
    for (var i in instances) {
      var v = instances[i];
      var url = config['redirectUrl'] + '/signin/' + jwt.getToken();
      var instance = document.createElement('div');
      instance.innerHTML = '<a href="' + url + '">' + v.name + '</a>'
      view.instances.appendChild(instance);
    }
  });
};