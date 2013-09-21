/**
 * Module dependencies.
 */

var User = require('mongoose').model('User');


/**
 * Facebook Registration
 *
 * @param {Object} profile PassportJS's profile
 * @param {Function} fn Callback accepting `err` and `user`
 * @api public
 */

exports.facebook = function facebook (profile, fn) {
  var user = new User();

  user.firstName = profile.name.givenName;
  user.lastName = profile.name.familyName;
  user.email = profile.emails[0].value;
  user.profiles.facebook = profile;
  user.avatar = getImageUrl(profile, user.email)

  user.save(function(err) {
    return fn(err, user);
  });
}

/**
 * Twitter Registration
 *
 * @param {Object} profile PassportJS's profile
 * @param {Function} fn Callback accepting `err` and `user`
 * @api public
 */

exports.twitter = function twitter (profile, fn) {
  var user = new User();

  user.fullName = profile.displayName;
  user.profiles.twitter = profile;       
  user.avatar = profile.photos[0].value;

  user.save(function(err) {
    return fn(err, user);
  });
}

/**
 * Get image url for profile
 *
 * @param {Object} profile
 * @param {String} email
 * @return {String} Profile image url (or `avatar`)
 * @api private
 */

function getImageUrl (profile, email) {
  return profile.imageUrl
    || 'http://gravatar.com/avatar/'.concat(md5(email)).concat('?d=mm&size=200')
    || '';
}

/**
 * MD5
 *
 * @param {String} source
 * @return {String} target
 * @api private
 */

function md5 (source) {
  return require('crypto')
    .createHash('md5')
    .update(source)
    .digest("hex");
}