function isEmpty(value){
    if (value === null || value === '' || value === undefined ){
        return true;
    }
    else {
        return false;
    }
}

function emptyFunction () {
    return;
}


function checkEmail (value) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}

function applyParams (object, config) {
    let property;
    if (object) {
        for (property in config) {
            object[property] = config[property];
        }
    }
    return object;
}

function createUrl (settings, url) {
    //return settings['serverProtocol'] + '://' + settings['serverHost'] + ':' + settings['serverPort'] + url;
    return url;
}

function prepareNotifications (notifications) {
    let notyList = [];

    for (let i = 0; i < notifications.length; i++) {
        let currentItem = notifications[i];
        currentItem['isRead'] = 'yes';
        notyList.push(currentItem);
    }

    return notyList;
}

export {isEmpty, createUrl, applyParams, emptyFunction, checkEmail, prepareNotifications};