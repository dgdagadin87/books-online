import {combineReducers} from 'redux';
import myBooks from './reducers/myBooks';

import common from './reducers/common';

const allReducers = combineReducers({
    commonData: common,
    myBooksData: myBooks
});

export default allReducers;