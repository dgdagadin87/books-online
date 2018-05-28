let defaultSettings = {
    'serverHost' : '127.0.0.1',
    'serverPort': 9002,
    'serverProtocol': 'http'
};

let pageSettings = {
    'start' : 1,
    'end': 1,
    'left': 2,
    'right': 2
};

let urlSettings = {
    'common'   : '/api/common',
    'login'    : '/api/login',
    'register' : '/api/register',
    'reset'    : '/api/reset'
};

export {defaultSettings, pageSettings, urlSettings};