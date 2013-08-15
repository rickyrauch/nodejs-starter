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
  auth: {
    facebook: {
      key: env.FB_CLIENT_ID,
      secret: env.FB_CLIENT_SECRET,
      callback: env.FB_CALLBACK
    },
    twitter: {
      key: env.TW_CONSUMER_KEY,
      secret: env.TW_CONSUMER_SECRET,
      callback: env.TW_CALLBACK
    }
  }
}