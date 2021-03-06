import {combineReducers} from 'redux';
import myBooks from './reducers/myBooks';
import allBooks from './reducers/allBooks';
import users from './reducers/users';
import addUser from './reducers/addUser';
import editUser from './reducers/editUser';
import addBook from './reducers/addBook';
import notifications from './reducers/notifications';
import profile from './reducers/profile';

import common from './reducers/common';

const allReducers = combineReducers({
    commonData: common,
    myBooksData: myBooks,
    allBooksData: allBooks,
    usersData: users,
    addUserData: addUser,
    editUserData: editUser,
    addBookData: addBook,
    notificationsData: notifications,
    profileData: profile
});

export default allReducers;