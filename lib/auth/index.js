/**
 * Module dependencies.
 */

var routes = require('./routes');
var passport = require('./passport');

/**
 * Expose Auth Module
 */

module.exports = Auth;

/**
 * Auth Module defining routes and 
 */
function Auth (app) {

  /**
   * Instantiates PassportJS
   * login strategies
   */
  
  passport(app);

  /**
   * Attach routes to parent application
   */
  
  app.use(routes);
}