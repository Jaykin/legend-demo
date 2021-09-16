
var assert = function (value, msg) {
    if (!value) {
        throw new Error(msg || (value + ' does not equal true'));
    }
}

var assertEqual = function (v1, v2, msg) {
    if (v1 !== v2) {
        throw new Error(msg || (v1 + ' does not equal ' + v2));
    }
}

module.exports.assert = assert;
module.exports.assertEqual = assertEqual;