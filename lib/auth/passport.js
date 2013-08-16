/*
 * Module dependencies
 */
var mongoose = require('mongoose')
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy;

/**
 * Expose Passport login
 * strategies
 *
 * @param {Express} app `Express` instance
 * @api public
 */

module.exports = function LoginStrategies (app) {

  /**
   * User model
   */

  var User = mongoose.model('User');

  /**
   * Passport Serialization of logged
   * User to Session from request
   */

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  /**
   * Passport Deserialization of logged
   * User by Session into request
   */

  passport.deserializeUser(function(userId, done) {
    User
    .findById(userId)
    .exec(function(err, user) {
      done(null, user);
    });
  });

  /**
   * Register Facebook Strategy
   */

  passport.use(new FacebookStrategy({
    clientID: app.get('config').auth.facebook.clientID,
    clientSecret: app.get('config').auth.facebook.clientSecret,
    callbackURL: app.get('config').auth.facebook.callback
  }, function(accessToken, refreshToken, profile, done) {
    User.findByProvider(profile, function(err, user) {
      if (err) {
        return done(err);
      }

      if (user) {
        return done(null, user);
      }

      registration.facebook(profile, function(err, user) {
        return done(err, user);
      });
    });
  }));

}