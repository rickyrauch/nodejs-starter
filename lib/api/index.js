/**
 * Module dependencies.
 */

var express = require('express');
var api = require('lib/db-api');
var utils = require('lib/utils');
var accepts = require('lib/accepts');
var restrict = utils.restrict;
var staff = utils.staff;
var pluck = utils.pluck;
var expose = utils.expose;
var log = require('debug')('platform:law');
var localPackage = require('../../package');

var app = module.exports = express();

/**
 * Limit request to json format only
 */

app.use(accepts(['application/json', 'text/html']));

app.get('/', function (req, res) {
    res.json({app: 'platform', env: process.env.NODE_ENV, version: localPackage.version, apiUrl: '/api'});
});


