
const initState = {
    past: [],
    present: null,
    future: []
}

function undoRedoReducer(state = initState, action = null) {
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
        case 'OTHER_ACTIONS':
            return {
                past: [...past, present],
                present: action.state,
                future: []
            }
        default :
            return state;
    }
}