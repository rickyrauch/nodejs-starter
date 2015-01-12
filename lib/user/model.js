/**
 * Module dependencies.
 */

var request = require('request');
var Stateful = require('stateful');

/**
 * User
 *
 * @param {String} path user's load path
 * @return {User} `User` instance
 * @api public
 */

function User (path) {
  if (!(this instanceof User)) {
    return new User(path);
  }

  this.$_state = 'unloaded';
  this.$_path = path;
}

/**
 * Inherit from `Stateful`
 */

Stateful(User);

/**
 * Loads user from path
 *
 * @param {String} path user's load path
 * @return {User} `User` instance.
 * @api public
 */

User.prototype.load = function(path) {
  var self = this;
  this.$_path = path || this.$_path;
  this.state('loading');

  request
  .get('/api/user/'.concat(this.$_path))
  .end(function(err, res) {
    var u = res.body;

    if (err || !res.ok) {
      return _handleRequestError.bind(self)(err || res.error);
    }

    if (!(u.id || u._id)) {
      return _handleRequestError.bind(self)('User not found');
    }

    for (var prop in u) {
      if (u.hasOwnProperty(prop)) {
        self[prop] = u[prop]
      }
    }
    self.state('loaded');
  });

  return this;
};

/**
 * Returns wether the receiver is logged (i.e.: sign in)
 *
 * @return {Boolean}
 * @api public
 */

User.prototype.logged = function() {
  return !!this.id;
};

/**
 * Unloads instance and notifies observers.
 *
 * @return {User}
 * @api public
 */

User.prototype.unload = function() {
  this.cleanup();
  this.$_path = null;
  this.state('unloaded');
  return this;
};

/**
 * Cleans up user
 *
 * @api private
 */

User.prototype.cleanup = function() {
  for (var i in this) {
    if ('_callbacks' == i) continue;
    if ('$' == i.charAt(0)) continue;
    if (!this.hasOwnProperty(i)) continue;
    if ('function' == typeof this[i]) continue;
    delete this[i];
  }
};

/**
 * Returns profile picture
 *
 * @api private
 */

User.prototype.profilePicture = function() {
  if (this.profilePictureUrl) return this.profilePictureUrl;
  return this.gravatar;
};

/**
 * Handle error from requests
 *
 * @param {Object} err from request
 * @api private
 */

function _handleRequestError (err) {
  // FIXME: change this off for handling it on subscribers
  // Shut ready's down
  this.off('ready');
  this.emit('error', err);
}

/**
 * Expose user model
 */
module.exports = User;
