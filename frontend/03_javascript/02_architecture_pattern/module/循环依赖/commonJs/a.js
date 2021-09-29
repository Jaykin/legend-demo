console.log('module a start...')

exports.done = false

const bModule = require('./b')
console.log('in module a, b.done = %j', bModule.done)

exports.done = true
console.log('module a done...')