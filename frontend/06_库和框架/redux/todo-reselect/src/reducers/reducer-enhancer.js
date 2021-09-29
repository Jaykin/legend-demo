


    // 组合reducers

    function combineReducers(reducers) {
        return function (state, action) {
            return Object.keys(reducers).reducer((nextState, key) => {
                nextState[key] = reducers[key](state[key], action);
                return nextState;
            }, {});
        }
    }



    // 为任意reducer添加处理UNDO和REDO的能力

    function undoable(reducer) {
        const initState = {
            past: [],
            present: reducer(null, {}),     // 用空的action调用reducer初始化present的state
            future: []
        }

        return function (state = initState, action = null) {
            const { past, present, future } = state;

            switch(action.type) {
                case 'UNDO':
                    const newPre = past[past.length - 1];
                    const newPast = past.slice(0, -1);
                    return {
                        past: newPast,
                        present: newPre,
                        future: [present, ...future]
                    }
                case 'REDO':
                    return {
                        past: [...past, present],
                        present: future[0],
                        future: future.slice(1)
                    }
                default :
                    // 将其他的action委托给原reducer处理
                    const newPre = reducer(present, action);
                    return {
                        past: [...past, present],
                        present: newPre,
                        future: []
                    };
            }
        }
    }