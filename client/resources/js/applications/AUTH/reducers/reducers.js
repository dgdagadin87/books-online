import {combineReducers} from 'redux';
import myBooks from './reducers/myBooks';
import allBooks from './reducers/allBooks';
import users from './reducers/users';
import addUser from './reducers/addUser';

import common from './reducers/common';

const allReducers = combineReducers({
    commonData: common,
    myBooksData: myBooks,
    allBooksData: allBooks,
    usersData: users,
    addUserData: addUser
});

export default allReducers;