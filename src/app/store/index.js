import {applyMiddleware, createStore} from 'redux'
import promiseMiddleware from 'redux-promise';
import reducers from './reducers/index';


export default createStore(reducers, {}, applyMiddleware(promiseMiddleware))
