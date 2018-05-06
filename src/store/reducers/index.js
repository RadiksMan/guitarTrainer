import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import UserReducer from './user';
import GuitarReducer from './guitar';

import globalReducer from './globalReducer';

const mainReducer = combineReducers({
    user:UserReducer,
    guitar:GuitarReducer
});

const rootReducer = reduceReducers(mainReducer, globalReducer);

export default rootReducer;
