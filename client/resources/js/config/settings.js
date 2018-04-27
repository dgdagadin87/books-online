let defaultSettings = {
    'serverHost' : '127.0.0.1',
    'serverPort': 9001,
    'serverProtocol': 'http'
};

let pageSettings = {
    'start' : 1,
    'end': 1,
    'left': 2,
    'right': 2
};

let urlSettings = {
    'getCommonData'  : '/common',
    'getBooksData'  : '/mybooks',
    'sendToMail'     : '/sendtomail/',
    'deleteMyBook'   : '/deletebook/'
};

export {defaultSettings, pageSettings, urlSettings};