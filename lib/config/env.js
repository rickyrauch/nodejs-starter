/**
 * Module dependencies.
 */

var env = process.env;

/**
 * Expose heroku helper
 */

module.exports = {
  port: env.PORT,
  mongoUrl: env.MONGO_URL,
  client: env.CLIENT_CONF ? env.CLIENT_CONF.split(',') : [ "organization name" ],
  auth: {
    facebook: {
      clientID: env.FB_CLIENT_ID,
      clientSecret: env.FB_CLIENT_SECRET,
      callback: env.FB_CALLBACK
    },
    twitter: {
      consumerKey: env.TW_CONSUMER_KEY,
      consumerSecret: env.TW_CONSUMER_SECRET,
      callback: env.TW_CALLBACK
    }
  }
}