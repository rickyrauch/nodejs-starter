/**
* Extend module's NODE_PATH
* HACK: temporary solution
*/

require('node-path')(module);

/**
* Module dependencies.
*/

var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

/*
 * Instance Schema
 */

var InstanceSchema = new Schema({
    title:     { type: String, required: true }
  , summary:   { type: String, required: true }
  , url:       { type: String, required: true }
  , owner:     { type: ObjectId, required: true, ref: 'User' }
  , createdAt: { type: Date, default: Date.now }
  , deletedAt: { type: Date }
});

InstanceSchema.index({ user: -1 });

module.exports = mongoose.model('Instance', InstanceSchema);
