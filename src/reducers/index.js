import { combineReducers } from 'redux';

import UserReducer from './reducer_user';
import GuitarReducer from './reducer_guitar';

const rootReducer = combineReducers({
    user:UserReducer,
    guitar:GuitarReducer
});

export default rootReducer;
