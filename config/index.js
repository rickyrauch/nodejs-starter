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
var env = require('./env');
var path = require('path');
var join = path.join;
var has = Object.prototype.hasOwnProperty;
var env = process.env.NODE_ENV || 'development';

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
  
  if (env == 'development') {
    /**
     * Load custom `config` settings from
     * file `development.json`
     */

    app.set('config', require('./development.json'));

    /**
     * Set `mongoUrl` for MongoDB connection
     * to `mongodb://localhost/dev-nodejs-boilerplate`
     */

    app.set('mongoUrl', app.get('config').mongoUrl);

    /**
     * Add build middleware
     */

    app.use(require('build').middleware);
  }

  /**
   * Load configuration settings
   * for testing setup
   */
  
  if (env == 'testing') {
    /**
     * Load custom `config` settings from
     * file `production.json`
     */

    app.set('config', require('./testing.json'));

    /**
     * Set `mongoUrl` for MongoDB connection
     * to `mongodb://localhost/test-nodejs-boilerplate`
     */

    app.set('mongoUrl', app.get('config').mongoUrl);
  }

  /**
   * Load configuration settings
   * for production setup
   */
  
  if (env == 'production') {
    /**
     * Load custom `config` settings from
     * file `production.json`
     */
    
    var conf = {};
    
    try {
      conf = require('./production.json');
    } catch (e) {
      // let it go
    }

    // `env` overrides `./production.json` file
    app.set('config', merge(conf, env));


    /**
     * Set `mongoUrl` for MongoDB connection
     * to `mongodb://localhost/nodejs-boilerplate`
     */

    app.set('mongoUrl', app.get('config').mongoUrl);
  }

  /**
   * Load configuration settings
   * for common setup
   */
  /**
   * Set application port
   */
  
  app.set('port', app.get('config').port || 3000);

  /**
   * Set `public-assets` default path
   */

  app.use(express.static( join(__dirname, '..', '/public')));
  
  /**
   * Configure native `express` body parser
   */

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded())

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

  app.use(session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    secret: 'nodejs-boilerplate',
    key: "nodejs-boilerplate",
    store: new MongoStore({
      url: app.get('mongoUrl')
    })
  }));

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