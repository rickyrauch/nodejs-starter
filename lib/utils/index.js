/**
 * Module dependencies.
 */

var has = Object.prototype.hasOwnProperty;
var crypto = require('crypto');
var log = require('debug')('njs:utils');

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