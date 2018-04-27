import {combineReducers} from 'redux';

import common from './reducers/common';
import reset from './reducers/reset';
import login from './reducers/login';
import register from './reducers/register';

const allReducers = combineReducers({
    commonData: common,
    loginData: login,
    registerData: register,
    resetData: reset
});

export default allReducers;