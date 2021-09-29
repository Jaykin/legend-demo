
import fetch from 'isomorphic-fetch';
import * as type from '../constants/ActionTypes';

    /*
    * 用户选择subreddit
    * */
export function selectReddit(subreddit) {
    return {
        type: type.SELECT_SUBREDDIT,
        subreddit
    }
}

export function invalidateReddit(subreddit) {
    return {
        type: type.INVALIDATE_SUBREDDIT,
        subreddit
    }
}


    /*
    * 网络请求（注意缓存的使用）
    * */
export function requestPosts(subreddit) {
    return {
        type: type.REQUEST_POSTS,
        subreddit
    }
}

export function receivePosts(subreddit, json) {
    return {
        type: type.RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

        // 抽离判断是否要更新数据的逻辑
function shouldFetchPosts(state, reddit) {
    const posts = state.postsByReddit[reddit];
    if (!posts) return true;
    if (posts.isFetching) return false;
    return posts.didInvalidate;
}

        // 返回函数的action创建器：需要用redux-thunk中间件来处理
export function fetchPosts(reddit) {
    return function (dispatch, getState) {
        if (shouldFetchPosts(getState(), reddit)) {
            dispatch(requestPosts(reddit));
            return fetch(`https://www.reddit.com/r/${reddit}.json`)
                    .then(response => response.json())
                    .then(json => dispatch(receivePosts(reddit, json)));
        }
    }
}



