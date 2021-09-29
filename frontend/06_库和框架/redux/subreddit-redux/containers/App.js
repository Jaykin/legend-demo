
    /*
    *
    * 容器组件
    *
    * */

    import React, { Component, PropTypes } from 'react';
    import { connect }  from 'react-redux';

    import Picker from '../components/Picker';
    import Posts from '../components/Posts';

    import * as types from '../constants/ActionTypes';
    import { selectReddit, fetchPosts, invalidateReddit } from '../actions/actions';


    // 创建容器组件
    class App extends Component {
        constructor(props) { super(props) }

        componentDidMount() {
            // 组件插入DOM后，初始化数据
            const { dispatch, selectedReddit } = this.props;
            dispatch(fetchPosts(selectedReddit));
        }

        componentWillReceiveProps(nextProps) {
                // 如果选择的不是同一个sub则重新fetch
            if (nextProps.selectedReddit !== this.props.selectedReddit) {
                const { dispatch, selectedReddit } = nextProps;
                dispatch(fetchPosts(selectedReddit));
            }
        }

        handleChange(nextReddit) {
            // subreddit变化，则dispatch更新state
            console.dir(this);
            this.props.dispatch(selectReddit(nextReddit));
        }

        handleRefreshClick(e) {
            // 刷新
            e.preventDefault();
            const { dispatch, selectedReddit } = this.props;
            dispatch(invalidateReddit(selectedReddit));
            dispatch(fetchPosts(selectedReddit));
        }

        render() {
            const { selectedReddit, items, isFetching, lastUpdated } = this.props;
            const isEmpty = items.length === 0;
            return (
                <div>
                    <Picker value={selectedReddit}
                            onChange={(value) => {this.handleChange(value)}}
                            options={[ 'reactjs', 'frontend' ]} />
                    <p>
                        {
                            lastUpdated &&
                            <span>
                              最近更新于： {new Date(lastUpdated).toLocaleTimeString()}.
                                            {' '}
                            </span>
                        }
                        {
                            !isFetching &&
                            <a href="#"
                               onClick={this.handleRefreshClick.bind(this)}>
                                刷新
                            </a>
                        }
                    </p>
                    {
                        isEmpty
                            ?
                        (isFetching ? <h2>加载中...</h2> : <h2>无内容.</h2>)
                            :
                        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <Posts posts={items} />
                        </div>
                    }
                </div>
            )
        }
    }

    // 组件的props验证
    App.propTypes = {
        selectedReddit: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }

        // 设置 state 映射到 props
    function mapStateToProps(state) {
        const { selectedReddit, postsByReddit } = state;
        const { isFetching, lastUpdated, items } = postsByReddit[selectedReddit] || {
            isFetching: true,
            items: []
        }

        return {
            selectedReddit,
            items,
            isFetching,
            lastUpdated
        }
    }

    export default connect(mapStateToProps)(App);