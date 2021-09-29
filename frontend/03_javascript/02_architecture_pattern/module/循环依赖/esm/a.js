console.log('module a start...')

import b from './b'
console.log('in module a, b.done = %j', b.done)

export default { done: true };
console.log('module a done...')