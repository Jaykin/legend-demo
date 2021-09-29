console.log('module b start...')

exports.done = false

const aModule = require('./a')
console.log('in module b, a.done = %j', aModule.done)

exports.done = true
console.log('module b done...')