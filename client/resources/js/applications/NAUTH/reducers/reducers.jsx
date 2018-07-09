import {combineReducers} from 'redux';

import common from './reducers/common';
import login from './reducers/login';

const allReducers = combineReducers({
    commonData: common,
    loginData: login
});

export default allReducers;