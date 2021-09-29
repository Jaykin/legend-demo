// event loop

// const fs = require('fs');
// fs.readFile(__filename, () => {
//   setTimeout(() => {
//     console.log('timeout');
//   }, 0);
//   setImmediate(() => {
//     console.log('immediate');
//   });
// });

process.nextTick(() => {
    console.log('nextTick');
});

console.log('main');

setTimeout(() => {
    console.log('setTimeout');
}, 0);

setImmediate(() => {
    console.log('setImmediate');
});

(new Promise((resolve) => {
    resolve();
})).then(() => {
    console.log('promise resolve');
});