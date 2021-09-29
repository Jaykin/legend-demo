
    /*
    日志记录
    * */

    // 1.0 手动记录
    let action = addTodo('use redux');
            // 记录action及state
    console.log('dispatching:', action);
    store.dispatch(action);
    console.log('nextState:', store.getState());


    // 2.0 封装dispatch
    function logDispatch(store, action) {
        console.log('dispatching:', action);
        store.dispatch(action);
        console.log('nextState:', store.getState());
    }
    logDispatch(store, action);

    //  3.0 重写store的dispatch(猴子补丁)
    function patchStoreToAddLogging(store) {
        let origin = store.dispatch;
        store.dispatch = function dispatchAndLog(action) {
            console.log('dispatching:', action);
            let result = origin(action);
            console.log('nextState:', store.getState());
            return result;
        }
    }

    function patchStoreToAddCrashReporting(store) {
        let origin = store.dispatch
        store.dispatch = function dispatchAndReportErrors(action) {
            try {
                return origin(action)
            } catch (err) {
                console.error('捕获一个异常!', err)
                Raven.captureException(err, {
                    extra: {
                        action,
                        state: store.getState()
                    }
                })
                throw err
            }
        }
    }


    // 4.0 隐藏monkeypatching
    function logger(store) {
        let next = store.dispatch;
        return function dispatchAndLog(action) {
            console.log('dispatching:', action);
            let result = next(action);
            console.log('nextState:', store.getState());
            return result;
        }
    }

    function crashReporter(store) {
        let next = store.dispatch;
        store.dispatch = function dispatchAndReportErrors(action) {
            try {
                return next(action);
            } catch (err) {
                console.error('捕获一个异常!', err);
                Raven.captureException(err, {
                    extra: {
                        action,
                        state: store.getState()
                    }
                })
                throw err;
            }
        }
    }

    function applyMiddlewareByMonkeypatching(store, middlewares) {
            // 注意要反转数组：因为中间件的执行流程是先进先执行！
        middlewares.reverse();
        middlewares.forEach(middleware => store.dispatch = middleware(store));
    }

    applyMiddlewareByMonkeypatching(store, [logger, crashReporter]);


        // 5.0 移除Monkeypatching
    function logger(store) {
        return function (next) {
            return function dispatchAndLog(action) {
                console.log('dispatching:', action);
                let result = next(action);
                console.log('nextState:', store.getState());
                return result;
            }
        }
    }

    function applyMiddleware(store, middlewares) {
        middlewares.reverse();

        let dispatch = store.dispatch;
        middlewares.forEach(middleware => dispatch = middleware(store)(dispatch));
        return Object.assign({}, store, { dispatch });
    }