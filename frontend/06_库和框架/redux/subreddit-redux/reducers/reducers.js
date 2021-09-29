
import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';


function selectedReddit(state = 'reactjs', action = null) {
    switch(action.type) {
        case types.SELECT_SUBREDDIT:
            return action.subreddit;
        default :
            return state;
    }
}


function posts(state = {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: null,
    items: []
}, action = null) {
    switch(action.type) {
        case types.INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, { didInvalidate: true });
        case types.REQUEST_POSTS:
            return Object.assign({}, state, { isFetching: true, didInvalidate: false });
        case types.RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                items: action.posts
            });
        default :
            return state;
    }
}

function postsByReddit(state = {}, action = null) {
    switch(action.type) {
        case types.INVALIDATE_SUBREDDIT:
        case types.REQUEST_POSTS:
        case types.RECEIVE_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state.postByReddit, action)
            })
        default :
            return state;
    }
}

const rootReducer = combineReducers({
    postsByReddit,
    selectedReddit
});

export default rootReducer;