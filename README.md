# Node.js Starter
Single Page App setup using industry's best practices and modules.
Node.js, Express, Mongoose, passport.js, component.io, Jade, Stylus and Bootstrap.

[Demo](http://nodejs-starter.herokuapp.com)

[![image](https://i.cloudup.com/ls3TZxQeMb.png)](https://cloudup.com/c9m73vDrkZk)


## Requirements
* [NodeJS & NPM](http://nodejs.org/download)
* [MongoDB](http://www.mongodb.org/downloads)

## Installation

Run from your terminal:

    git clone git@github.com:gravityonmars/nodejs-starter.git
    cd nodejs-starter
    make 

*Note:* edit your config/development.json with your Facebook & Twitter keys. [Instructions here](https://cloudup.com/c41pFaKcMBu)

## Related modules
* [express](https://github.com/visionmedia/express) — web application framework for node
* [Jade](https://github.com/visionmedia/jade) — Template engine
* [stylus](https://github.com/visionmedia/stylus) — Pre-processor CSS
* [component.io](https://github.com/component/component) — client package management for building better web applications
* [Bootstrap](http://getbootstrap.com) — CSS Framework
* [passport](http://passportjs.org) — Simple, unobtrusive authentication for Node.js.
* [mongoose](http://mongoosejs.com/) — MongoDB object modeling tool designed to work in an asynchronous environment.
* [connect-mongo](https://github.com/kcbanner/connect-mongo) — MongoDB session store for Connect


## Test

    npm test

## Projects using it
* [DemocracyOS](http://github.com/DemocracyOS/app)
* [Auth0 Website](http://auth0.com)
* [Add yours](https://github.com/gravityonmars/nodejs-starter/edit/master/README.md)

## Contributors
* [Cristian Douce](http://twitter.com/cristiandouce)
* [Ricardo Rauch](http://twitter.com/gravityonmars)

## Common errors
* `buffer.js:382 throw new Error('Unknown encoding');`
  Update your node.js version
* Difficulties under Windows, refer to issue [#4](https://github.com/gravityonmars/nodejs-starter/issues/4)
* Heroku deployment check issue [#5](https://github.com/gravityonmars/nodejs-starter/issues/5)
* Getting { [Error: EMFILE, open %fileName%'] errno: 20, code: 'EMFILE', after running make, make run or make run-dev This is due to a limit on the amount of files that can be open at the same time by your OS. Update your .base_profile file (or similar) by adding ulimit -n 2048.

## Licence 
MIT
