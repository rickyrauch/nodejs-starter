/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


/**
 * Define `User` Schema
 */

var UserSchema = new Schema({
    firstName: { type: String }
  , lastName:  { type: String }
  , username:  { type: String }
  , avatar:    { type: String }
  , email:     { type: String, lowercase: true, trim: true } // main email
  , profiles:  {
        facebook: { type: Object }
      , twitter:  { type: Object }
    }
  , createdAt: { type: Date, default: Date.now }
  , updatedAt: { type: Date }
});

/**
 * Define Schema Indexes for MongoDB
 */

UserSchema.index({ firstName:1, lastName:1 });

/**
 * Define Schema toObject options
 */

UserSchema.set('toObject', { getters: true });
UserSchema.set('toJSON', { getters: true });

/**
 * -- Model's Plugin Extensions
 */

// Nothing here yet

/**
 * -- Model's API Extension
 */

/**
 * Get `fullName` from `firstName` and `lastName`
 *
 * @return {String} fullName
 * @api public
 */

UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

/**
 * Set `fullName` from `String` param splitting
 * and calling firstName as first value and lastName
 * as the concatenation of the rest values
 *
 * @param {String} name
 * @return {User}
 * @api public
 */

UserSchema.virtual('fullName').set(function(name) {
  var split = name.split(' ');
  if(split.length) {
    this.firstName = split.shift();
    this.lastName = split.join(' ');
  }

  return this;
});

/**
 * Find `User` by its email
 * 
 * @param {String} email
 * @return {Error} err
 * @return {User} user
 * @api public
 */

UserSchema.statics.findByEmail = function(email, cb) {
  return this.findOne({ email: email })
    .exec(cb);
}

/**
 * Find `User` by social provider id
 * 
 * @param {String|Number} id
 * @param {String} social
 * @return {Error} err
 * @return {User} user
 * @api public
 */

UserSchema.statics.findByProvider = function(profile, cb) {
  var path = 'profiles.'.concat(profile.provider).concat('.id');
  var query = {};
  query[path] = profile.id;
  return this.findOne(query)
    .exec(cb);
}

/**
 * Expose `User` Model
 */

module.exports = mongoose.model('User', UserSchema);