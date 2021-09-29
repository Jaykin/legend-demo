console.log('module b start...')

import a from './a'
console.log('in module b, a.done = %j', a.done)

export default { done: true };
console.log('module b done...')