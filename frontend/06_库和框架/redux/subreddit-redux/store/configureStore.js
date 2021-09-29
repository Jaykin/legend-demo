

        /*
        * 封装创建store的过程
        * */
        import { createStore, applyMiddleware } from 'redux';
        import thunk from 'redux-thunk';
        import createLogger from 'redux-logger';
        import rootReducer from '../reducers/reducers';

        const middlewares = [ thunk ];
        if (process.env.NODE_ENV !== 'production') {
            middlewares.push(createLogger())
        }

        export default function configureStore(initState) {
            return createStore(rootReducer, initState, applyMiddleware(...middlewares));
        }
