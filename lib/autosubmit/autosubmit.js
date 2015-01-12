/**
 * Module dependencies.
 */

var o = require('dom');
var request = require('request');
var serialize = require('serialize');

module.exports = function (View) {
  function(value, el, view) {

  }
}

function autosubmit(form, fn) {
  var form = o(form);
  var action = form.attr('action');
  var method = form.attr('method').toLowerCase();
  var data = serialize.object(form[0]);

  if ('delete' == method) {
    method = 'del';
  }

  var req = request[method](action).send(data);
  req.end(function(err, res) {
    fn(err, res);
  });
  return req;
}