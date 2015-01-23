/**
 * Module dependencies.
 */

var has = Object.prototype.hasOwnProperty;
var crypto = require('crypto');
var log = require('debug')('platform:utils');

/**
 * HOP ref.
 */

exports.has = has;

/**
 * MD5 hash generator.
 *
 * @param {String} string String to encrypt.
 * @return {String} MD5 encrypted string.
 * @api public
 */

exports.md5 = function md5(string) {
  return crypto.createHash('md5').update(string).digest("hex");
}

/**
 * Basic access restriction middleware
 * for authenticated users.
 */

exports.restrict = function restrict(req, res, next) {
  log('Checking for logged in citizen');

  if (req.user) {
    log('Citizen logged in, moving on...')
    next();
  } else {
    log('Citizen is not logged in. Path %s is restricted.', req.path);
    // we should actually redirect
    // to a login page...
    res.format({
      html: function () {
        //TODO: update this with new credential system
        res.send(403);
      },
      json: function() {
        res.json(403, {
          error: 'Forbidden access',
          action: {
            redirect: '/login'
          }
        })
      }
    });
  }
};