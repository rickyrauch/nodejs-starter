/*
 * Module dependencies
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var utils = require('lib/utils');
var log = require('debug')('democracyos:auth:strategy');
var User = require('lib/models').User;


/**
 * Passport Serialization of logged
 * User to Session from request
 */

passport.serializeUser(function(user, done) {
  done(null, user._id);
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
 * Register Local Strategy
 */

passport.use(new LocalStrategy(User.authenticate()));