import actions from '../../../config/actions';
import Request from '../../../core/request';
import {createUrl} from '../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../config/settings';

export const toggleDisplayList = (displayList) => {
    return {
        type: actions.NOTIFICATIONS_SET_DISPLAY_LIST,
        payload: displayList
    }
};

export const setNotificationsData = () => {
    return dispatch => {

        const urlToSend = `${createUrl(defaultSettings, urlSettings['getNotifyInfo'])}`;

        Request.send({
            url: urlToSend,
            type: 'get'
        })
        .then( (response) => {

            const {notReadCount = 0, notifications = []} = response;

            dispatch({
                type: actions.NOTIFICATIONS_SET_DATA,
                payload: {notReadCount, notifications}
            });
        })
        .catch((error) => {
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });

    }
};

export const setNotificationsRead = (notificationIds) => {
    return dispatch => {

        const urlToSend = `${createUrl(defaultSettings, urlSettings['setNotifyRead'])}`;

        Request.send({
            url: urlToSend,
            data: {ids: JSON.stringify(notificationIds)},
            type: 'get'
        })
        .then( () => {

            dispatch({
                type: actions.NOTIFICATIONS_SET_DATA,
                payload: {notReadCount: 0}
            });
        })
        .catch((error) => {
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });
    }
};

export const clearNotifications = (notificationIds) => {
    return dispatch => {

        const urlToSend = `${createUrl(defaultSettings, urlSettings['clearNotify'])}`;

        Request.send({
            url: urlToSend,
            type: 'post',
            data: JSON.stringify({notificationIds})
        })
        .then( () => {

            dispatch({
                type: actions.NOTIFICATIONS_SET_DATA,
                payload: {notReadCount: 0, notifications: []}
            });
        })
        .catch((error) => {
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });
    }
};