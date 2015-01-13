/**
 * Module dependencies.
 */

var debug = require('debug')('platform:autosubmit');
var o = require('dom');
var request = require('request');
var serialize = require('serialize');

module.exports = function (View) {
  View.directive('autosubmit', autosubmit);
}

function autosubmit(value, form, view) {
  var form = o(form);

  if (view.autovalidating) {
    view.on('valid', submit);
  } else {
    form.on('submit', function(e) {
      e.preventDefault();
      view.emit('submit');
      submit();
    });
  }

  function submit() {
    var action = form.attr('action');
    var method = form.attr('method').toLowerCase();
    var data = serialize.object(form[0]);

    if ('delete' == method) {
      method = 'del';
    }

    view.emit('request', method, action, data);

    var req = request[method](action).send(data);
    req.end(function(err, res) {
      view.emit('response', err, res);
    });
    return req;
  }
}