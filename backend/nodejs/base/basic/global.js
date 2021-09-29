// 全局变量

console.log(__dirname);
console.log(__filename);

// 微任务队列
queueMicrotask(() => {
    console.log('queueMicrotask start!');
});

process.nextTick(() => {
    console.log('process.nextTick start!');
});

// WebAssembly