import {combineReducers} from 'redux';

import common from './common/common';
import reset from './reset/reset';
import login from './login/login';
import register from './register/register';

const allReducers = combineReducers({
    commonData: common,
    loginData: login,
    registerData: register,
    resetData: reset
});

export default allReducers;