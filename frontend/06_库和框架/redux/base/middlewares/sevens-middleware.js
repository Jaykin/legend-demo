

    /*
    *
    * 中间件示例：
    *
    * */

        // 1.0 记录所有被发起的 action 以及产生的新的 state
    const logger = store => next => action => {
        console.group(action.type);
        console.info('dispatching', action);
        let result = next(action);
        console.dir('next state', store.getState());
        console.groupEnd(action.type);
        return result;
    }


        // 2.0 在 state 更新完成和 listener 被通知之后发送崩溃报告
    const crashReporter = store => next => action => {
        try {
            return next(action);
        } catch (err) {
            console.error('Caught an exception!', err);
            Raven.captureException(err, {
                extra: {
                    action,
                    state: store.getState()
                }
            })
            throw err
        }
    }


        // 3.0 用 { meta: { delay: N } } 来让 action 延迟 N 毫秒。
        //     在这个案例中，让 `dispatch` 返回一个取消 timeout 的函数
    const delayAction = store => next => action => {
        if (!action.meta || !action.meta.delay) {
            return next(action);
        }

        let timer = setTimeout(() => {
            next(action);
        }, action.meta.delay);
        return function cancel() { clearTimeout(timer) };
    }


        // 4.0 通过 { meta: { raf: true } } 让 action 在一个 rAF 循环帧中被发起。
            // 在这个案例中，让 `dispatch` 返回一个从队列中移除该 action 的函数。
    const rafSchedler = store => next => {
        let queuedActions = [];
        let frame = null;

        function loop() {
            if (queuedActions.length) {
                next(queuedActions.shift());
                frame = requestAnimationFrame(loop);
            }
        }

        return action => {
            if (!action.meta || !action.meta.raf) {
                return next(action);
            }
            queuedActions.push(action);
            loop();

            return function cancel() {
                queuedActions.filter(a => a !== action);
            }
        }
    }


        // 5.0 使你除了 action 之外还可以发起 promise。
            //* 如果这个 promise 被 resolved，他的结果将被作为 action 发起。
            //* 这个 promise 会被 `dispatch` 返回，因此调用者可以处理 rejection。
    const aboutPromise = store => next => action => {
        if (typeof action.then !== 'function') {
            return next(action);
        }
        return Promise.resolve(action).then(store.dispatch);
    }