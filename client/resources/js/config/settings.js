const defaultSettings = {
    'serverHost' : '127.0.0.1',
    'serverPort': 8000,
    'serverProtocol': 'http'
};

const pageSettings = {
    'start' : 1,
    'end': 1,
    'left': 2,
    'right': 2
};

const urlSettings = {
    'common'       : '/api/common',
    'login'        : '/api/login',

    'myBooks'      : '/api/mybooks',
    'allBooks'     : '/api/allbooks',
    'users'        : '/api/users',
    'toMail'       : '/api/sendtomail/',
    'downloadBook' : '/api/download/',
    'deleteMyBook' : '/api/deletemybook/',
    'deleteBook'   : '/api/deletebook/',
    'addUser'      : '/api/adduser',
    'deleteUser'   : '/api/deleteuser/',
    'getUser'      : '/api/getuser/',
    'editUser'     : '/api/edituser/',
    'getAddBook'   : '/api/addbook',
    'getRawBook'   : '/api/getrawbook',
    'addRawBook'   : '/api/addrawbook',
    'editProfile'  : '/api/editprofile',

    'getNotifyInfo': '/api/getnotifyinfo',
    'setNotifyRead': '/api/setnotifyread',
    'clearNotify'  : '/api/clearnotify'
};

const getNotificationsPeriod =  60 * 1000;

export {defaultSettings, pageSettings, urlSettings, getNotificationsPeriod};