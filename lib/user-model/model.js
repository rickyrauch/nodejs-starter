/**
 * Module dependencies.
 */

var request = require('superagent');
var Emitter = require('emitter');

/**
 * Expose user model
 */

module.exports = User;

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
  };

  this.$_path = path;
  this.$_ready = "unloaded";
}


/**
* Unloads user instance
*
* @api private
*/

function logout() {
  log('logging out user');
  if (user.logged()) user.unload();
}

/**
 * Inherit from `Emitter`
 */

Emitter(User.prototype);

/**
 * Loads user from path
 *
 * @param {String} path user's load path
 * @return {User} `User` instance.
 * @api public
 */

User.prototype.load = function(path) {
  var _this = this;
  this.$_path = path || this.$_path;
  this.$_ready = "loading";

  request
  .get('/api/users/'.concat(this.$_path))
  .set('Accept', 'application/json')
  .on('error', _handleRequestError.bind(this))
  .end(function(res) {
    var u = res.body;

    if (!res.ok) {
      return _handleRequestError.bind(_this)(res.error);
    };

    if (!(u.id || u._id)) {
      return _handleRequestError.bind(_this)('User not found');
    };

    for (var prop in u) {
      if (u.hasOwnProperty(prop)) {
        _this[prop] = u[prop]
      }
    }
    _this.$_ready = "loaded";
    _this.emit('ready');
  });

  return this;
}

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
 * Call `fn` once User is
 * ready from loading
 *
 * @param {Function} fn callback fired on ready
 * @return {User} `User` instance
 * @api public
 */

User.prototype.ready = function(fn) {
  var _this = this;

  function done() {
    if ("loaded" === _this.state()) {
      return fn();
    }
  }

  if ("loaded" === this.state()) {
    setTimeout(done, 0);
  } else {
    this.once("ready", done);
  }

  return this;
}

/**
 * Get $_ready state
 *
 * @return {String}
 * @api public
 */

User.prototype.state = function() {
  return this.$_ready;
}

/**
* Returns wether the receiver is logged (i.e.: sign in)
*
* @return {Boolean}
* @api public
*/

User.prototype.logged = function() {
  return !!this.id;
}

/**
* Unloads instance and notifies observers.
*
* @return {User}
* @api public
*/

User.prototype.unload = function() {
  this.cleanup();
  this.$_path = null;
  //this.state('unloaded');
  this.emit('unloaded');
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
 * Handle error from requests
 *
 * @param {Object} err from request
 * @api private
 */

function _handleRequestError (err) {
  this.$_ready = "unloaded";
  this.emit('error', err);
}

User.prototype.logout = function () {
  if (this.logged()) {
      this.unload();
  }
};

