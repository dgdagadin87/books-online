import {combineReducers} from 'redux';

import common from './reducers/common';

const allReducers = combineReducers({
    commonData: common
});

export default allReducers;