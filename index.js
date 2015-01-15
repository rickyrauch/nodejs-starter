/**
 * Module dependencies.
 */

var http = require('http');
var express = require('express');
var app = module.exports = require('lib/boot');
var debug = require('debug')('platform');

/**
 * Launch server
 */

http.createServer(app).listen(app.get('privatePort'), function() {
  debug('Application started on port %d', app.get('privatePort'));
});
