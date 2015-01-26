/**
 * Module dependencies.
 */

var express = require('express');

/**
 * Exports Application
 */

var app = module.exports = express();

/**
 * Define routes for Dashboard module
 */

app.get('/', function(req, res, next) {
  var instances = [
    { id: 1, name: 'Partido de la Red', summary: 'The Net Party\'s official deployment of DemocracyOS', url: '', signinUrl: '' },
    { id: 2, name: 'Demos', summary: 'Buenos Aires City Congress opens up for citizen collaboration in legislation drafting', url: '', signinUrl: '' },
    { id: 3, name: 'Datos Abiertos Mexico', summary: 'Mexican government\'s official deployment Open Data Policy', url: '', signinUrl: '' }
  ];

  return res.status(200).json(instances);
});