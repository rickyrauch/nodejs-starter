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
   * Configure native `express` cookie parser
   */

  app.use( cookieParser('nodejs-boilerplate') );

  /**
   * Configure native `express` session middleware
   */

  app.use( session( {
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    secret: 'democracyos-secret',
    key: "democracyos.org",
    store: new MongoStore( { url: config('mongoUrl') } )
  } ));

  /**
  * Use `express.csrf` middleware
  */

  app.use(csrf());
  app.use(function (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
  });

  /**
   * Use `passport` setup & helpers middleware
   */

  app.use(passport.initialize());

  /**
   * Use `passport` sessions middleware
   */

  app.use(passport.session());

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
