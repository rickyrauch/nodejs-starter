/**
 * Module dependencies.
 */

var config = require('config');
var page = require('page');
var translations = require('translations');
var t = require('t');

/**
 * Load localization dictionaries to translation application
 */

translations.help(t);

/**
 * Init `t` component with locale as `es`
 */

t.lang(config.locale);

/**
 * Boot components
 * and pages.
 */

require('header');
require('homepage');
require('signup');
require('signin');
require('forgot');
require('logout');
require('restricted');

/**
 * Boot page.js
 */

page();
