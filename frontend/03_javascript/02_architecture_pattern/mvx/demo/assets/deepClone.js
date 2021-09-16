
var $ = require('jquery');

module.exports = function deepClone(origin) {
    return $.extend(true, {}, origin);
}