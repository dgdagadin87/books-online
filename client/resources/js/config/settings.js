const defaultSettings = {
    'serverHost' : '127.0.0.1',
    'serverPort': 9002,
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
    'register'     : '/api/register',
    'reset'        : '/api/reset',

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

    'getNotifyInfo': '/api/getnotifyinfo',
    'setNotifyRead': '/api/setnotifyread'
};

const getNotificationsPeriod =  60 * 1000;

export {defaultSettings, pageSettings, urlSettings, getNotificationsPeriod};