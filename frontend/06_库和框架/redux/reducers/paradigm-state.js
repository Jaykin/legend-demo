


    /**
     * state范式化：减少冗余数据，便于reducer使用（数据库原理）
     *
     * */

    // eg. 一个博客 --> 多篇文章 --> 多条评论 --> 评论和文章都是由用户产生的
        // 初始结构如下：以每篇文章为基准（感觉颗粒度是不是很小，而且文章很抽象，其是由多种模块组成的）

    var blogState = [
        {
            id: 'post1',
            athor: { userName: 'user1', name: 'User 1' },
            body: '',
            comments: [
                {
                    id: 'comment1',
                    author: { userName: 'user2', name: 'User 2' },
                    comments: 'xxx'
                },
                {
                    id: 'comment2',
                    author: { userName: 'user3', name: 'User 3' },
                    comments: 'xxx'
                }
            ]
        },
        {
            id: 'post2',
            athor: { userName: 'user2', name: 'User 2' },
            body: '',
            comments: [
                {
                    id: 'comment1',
                    author: { userName: 'user1', name: 'User 1' },
                    comments: 'xxx'
                }
            ]
        }
    ];


    // 范式化state

    var blogState = {
        users: {
            'user1': {
                id: 'user1',
                userName: 'user1',
                name: 'User 1'
            },
            'user2': {
                id: 'user2',
                userName: 'user2',
                name: 'User 2'
            }
        },
        comments: {
            'comment1': {
                id: 'comment1',
                author: 'user1',
                comment: 'xxx'
            },
            'comment2': {
                id: 'comment2',
                author: 'user2',
                comment: 'xxx'
            }
        },
        posts: {
            'post1': {
                id: 'post1',
                author: 'user1',        // 作者ID
                body: '',
                comments: ['comment1', 'comment2']            // 评论ID列表
            }
        }
    }


    // 中间件：改写dispatch （在action到达reducer之前做些操作）

        // 01 封装compose(f, g, h)：(...args) => f(g(h(...args)))
                // ...args为数据源
    function compose(...funcs) {
        if (funcs.length === 0) {
            return arg => arg
        }

        if (funcs.length === 1) {
            return func[0]
        }

        const last = funcs[funcs.length - 1];
        const rest = funcs.slice(0, -1);

        return (...args) => rest.reducerRight((preRet, curFunc) => curFunc(preRet));
    }




