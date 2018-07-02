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

export const setNotificationsRead = () => {
    return dispatch => {

        const urlToSend = `${createUrl(defaultSettings, urlSettings['setNotifyRead'])}`;
        const nowDate = new Date();
        const microTime = nowDate.getTime();

        Request.send({
            url: urlToSend,
            type: 'get',
            data: {time: microTime}
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