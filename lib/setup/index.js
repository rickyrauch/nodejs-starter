/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var errorhandler = require('errorhandler');
var compression = require('compression');
var resolve = require('path').resolve;
var nowww = require('nowww')
var config = require('lib/config');
var csrf = require('csurf');
var path = require('path');
var join = path.join;
var jwt = require('lib/jwt');
var log = require('debug')('democracyos-platform:setup')
var has = Object.prototype.hasOwnProperty;

/**
 * Expose configuration helper
 *
 * @param {Express} app `Express` instance.
 * @api public
 */

module.exports = function configuration (app) {

  /**
   * Load configuration settings
   * for development setup
   */

  if (config('env') == 'development') {

    /**
     * Add build middleware
     */

    app.use(require('lib/build').middleware);
  }

  /**
   * Load configuration settings
   * for testing setup
   */

  if (config('env') == 'testing') {

    // Log config settigs load
    log( 'testing settings' );

  }

  /**
   * Load configuration settings
   * for production setup
   */

  if (config('env') == 'production') {

    // Log config settigs load
    log( 'production settings' );

    /**
     * Set `nowww` middleware helper
     */

    app.use( nowww() );

    /**
     * Set `native` express compression middleware
     */

    app.use( compression() );
  }

  /**
   * Load configuration settings
   * for common setup
   */

   /**
    * Save config in app
    */

  app.set('config', config);

  /**
   * Set application port
   */

  app.set('privatePort', app.get('config').privatePort || 3000);

  /**
   * Set `public-assets` default path
   */

  app.use(express.static(resolve('public')));

  /**
   * Configure native `express` body parser
   */

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended: true}))

  // parse application/json
  app.use(bodyParser.json())

  // parse application/vnd.api+json as json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

  /**
   * JSON Web Tokens (JWT)
   */

  app.set('jwtTokenSecret', config('secret'));

  app.use(function(req, res, next) {
    req.jwtAuthenticated = function(cb) {
      log('Looking for a JSON Web Token in HTTP header x-access-token...');
      var qs = req.query ? req.query.access_token : '';
      var token = qs || this.headers['x-access-token'];

      if (token) {
        jwt.decodeToken(token, app.get('jwtTokenSecret'), function(err, user) {
          req.user = user;
          cb(err, user);
        });
      } else {
        log('HTTP header x-access-token has no token. Moving on...');
        return cb();
      }
    };

    next();
  });

  /**
   * Use `passport` setup & helpers middleware
   */

  app.use(passport.initialize());

  /**
   * Set custom error handler
   */

  app.use(function(err, req, res, next) {
    // log
    console.log('Some odd error: %j', err);
    // now let it go
    next();
  });

  /**
   * Set native `express` error handler
   */

  app.use(errorhandler());
}

/**
 * Some helpers
 */

/**
 * Merge `b` into `a`.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api public
 */

function merge (a, b){
  for (var key in b) {
    if (has.call(b, key) && b[key] != null) {
      if (!a) a = {};
      if ('object' === typeof b[key]) {
        a[key] = merge(a[key], b[key]);
      } else {
        a[key] = b[key];
      }
    }
  }
  return a;
};
