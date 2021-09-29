// querystring
const querystring = require('querystring');

const sep = '&';
const eq = '=';

let qStr = querystring.stringify({
    'q1': 1,
    'q2': [2, 3],
    'q3': '王凯杰'
}, sep, eq);
console.log('querystring.stringify: ', qStr);   // q1=1&q2=2&q2=3&q3=%E7%8E%8B%E5%87%AF%E6%9D%B0

let qObj = querystring.parse(qStr, sep, eq);
console.log('querystring.parse: ', qObj);