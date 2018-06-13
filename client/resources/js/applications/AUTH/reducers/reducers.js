import {combineReducers} from 'redux';
import myBooks from './reducers/myBooks';
import allBooks from './reducers/allBooks';

import common from './reducers/common';

const allReducers = combineReducers({
    commonData: common,
    myBooksData: myBooks,
    allBooksData: allBooks
});

export default allReducers;