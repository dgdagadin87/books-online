import actions from '../../../config/actions';
import Request from '../../../core/request';
import {createUrl} from '../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../config/settings';

export const asyncGetUsers = (collection, actionData, queryData) => {
    return dispatch => {

        const startLoadingAction = collection === false ? 'USERS_START_GLOBAL_LOADING' : 'USERS_START_LOADING';

        dispatch({
            type: actions[startLoadingAction],
            payload: actionData
        });

        Request.send({
            url: createUrl(defaultSettings, urlSettings['users']),
            data: {...queryData, ...actionData}
        })
        .then( (response) => {

            const {collection = [], filter = {}, paging = {}} = response;

            dispatch({
                type: actions.USERS_STOP_LOADING,
                payload: {collection, ...filter, ...paging}
            })
        })
        .catch((error) => {
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.USERS_STOP_LOADING, payload: null });
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });
    }
};

export const asyncDeleteUser = (userId, loadUsersCallback) => {
    return dispatch => {

        const urlToSend = `${createUrl(defaultSettings, urlSettings['deleteUser'])}${userId}`;

        dispatch({
            type: actions.USERS_START_LOADING,
            payload: {}
        });

        Request.send({
            url: urlToSend
        })
        .then( () => {

            alert('Пользователь успешно удален.');
            loadUsersCallback();
        })
        .catch((error) => {

            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.USERS_STOP_LOADING, payload: null });
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });
    }
};