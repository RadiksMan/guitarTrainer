import { combineReducers } from 'redux';

import UserReducer from './user';
import GuitarReducer from './guitar';

const rootReducer = combineReducers({
    user:UserReducer,
    guitar:GuitarReducer
});

export default rootReducer;
