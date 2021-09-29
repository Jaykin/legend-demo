const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
    SyncLoopHook,
    
	AsyncSeriesHook,
	AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,

    AsyncParallelHook,
    AsyncParallelBailHook,
    
    MultiHook
} = require("../lib/index");

// 1、创建 hooks
class JayHooksDemo {
    constructor() {
        this.hooks = this._createHooks();
    }

    callHook1() {
        console.log('hook1.call.start');
        this.hooks.hook1.call('a value', 'b value', 'c value');
        console.log('hook1.call.end');
    }

    callHook2() {
        console.log('hook2.callAsync.start');
        this.hooks.hook2.callAsync('a value', 'b value', 'c value', () => {
            console.log('hook2.callAsync.end');
        });

        // this.hooks.hook2.promise('a value', 'b value', 'c value')
        //     .then(() => {
        //         console.log('hook2.promise.end');
        //     });
    }

    _createHooks() {
        const hooks = {
            'hook1': new SyncHook(['a', 'b', 'c']),
            'hook2': new AsyncSeriesHook(['a', 'b', 'c'])
        };

        // MultiHook
        hooks.allHooks = new MultiHook([hooks.hook1, hooks.hook2]);

        // 为 hook 添加拦截器
        hooks.hook1.intercept({
            context: true,
            call: (context, a, b, c) => {
                console.log('hook1.call.intercept: ', context, a, b, c);
            },

            tap: (context, tapInfo) => {
                // tapInfo = { type: "promise", name: "GoogleMapsPlugin", fn: ... }
                console.log('hook1.tap.intercept: ', tapInfo);
            },

            register: (tapInfo) => {
                // 无 context
                console.log('hook1.register.intercept: ', tapInfo);
            },

            // loop: () => {

            // }
        });

        // hooks.hook2.intercept({
        //     register: (tapInfo) => {
        //         // 无 context
        //         console.log('hook2.register.intercept: ', tapInfo);
        //     },
        // });

        return hooks;
    }
}
const jay = new JayHooksDemo();

// 2、挂入 hook 函数
jay.hooks.hook1.tap({
    name: 'hook1::tap1',
    context: true
}, (context, a, b, c) => {
    console.log('hook1.tap1.callback', a, b, c);
});

jay.hooks.hook2.tapAsync('hook2::tap1', (a, b, c, callback) => {
    setTimeout(() => {
        console.log('hook2.tapAsync.callback', a, b, c);

        callback(); // 意味着 hook 函数执行完成
    });
});

jay.hooks.hook2.tapPromise('hook2::tap2', (a, b, c) => {
    // return promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('hook2.tapPromise.callback', a, b, c);
            resolve(); // 意味着 hook 函数执行完成
        });
    });
});

jay.hooks.allHooks.tap('allHooks::tap', () => {
    console.log('allHooks.tap.callback');
});

// 3、触发 hook
jay.callHook1();
jay.callHook2();
