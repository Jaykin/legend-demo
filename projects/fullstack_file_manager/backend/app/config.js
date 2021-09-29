
const CONST = require('./env');
let config;

if (process.env.NODE_ENV === CONST.DEV) {
    config = require('../config/development.json');
} else if (process.env.NODE_ENV === CONST.UNITTEST) {
    config = require('../config/unitest.json');
} else {
    config = require('../config/config.json');
}

module.exports = config;
