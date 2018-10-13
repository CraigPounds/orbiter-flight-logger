'use strict';
const {router} = require('./router');
const {localStrategy, jwtStrategy} = require('./strategies');
console.log(jwtStrategy);
module.exports = {router, localStrategy, jwtStrategy};
