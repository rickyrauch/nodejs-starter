/*
 *  Module dependencies
 */

var mongoose = require('mongoose');

/**
 * Expose models linker helper
 *
 * @param {Express} app `Express` instance
 */

var exports = module.exports = function models (app) {

  /*
   *  Connect to mongo
   */

  mongoose.connect(app.get('config').mongoUrl, { db: { safe: true }});

  /**
   * Register `User` model
   */

  exports.User = require('./user');

  /**
   *  Register `Token` model
   */

  require('./token');

  /**
   * Register `Instance` model
   */

  require('./instance');
}