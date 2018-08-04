import actions from '../../../config/actions';
import Request from '../../../core/request';
import {createUrl} from '../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../config/settings';

export const asyncGetUser = (userId) => {
    return dispatch => {

        dispatch({
            type: actions.EDIT_USER_START_LOADING,
            payload: null
        });

        Request.send({
            url: `${createUrl(defaultSettings, urlSettings['getUser'])}${userId}`
        })
        .then( (response) => {

            const {userLogin, userName, userIsAdmin} = response;

            dispatch({
                type: actions.EDIT_USER_STOP_GET_LOADING,
                payload: {userId, userLogin, userName, userIsAdmin}
            });
        })
        .catch((error) => {
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.EDIT_USER_STOP_GET_LOADING, payload: { errorText: '' } });
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });
    }
};

export const asyncEditUser = (history, userId, userLogin, userName, userIsAdmin) => {
    return dispatch => {

        dispatch({
            type: actions.EDIT_USER_START_LOADING,
            payload: null
        });

        Request.send({
            type: 'post',
            url: `${createUrl(defaultSettings, urlSettings['editUser'])}${userId}`,
            data: {userId, userLogin, userName, userIsAdmin},
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        })
            .then( (response) => {

                if (response.hasError === true) {
                    dispatch({
                        type: actions.EDIT_USER_STOP_LOADING,
                        payload: { errorText: response.errorText }
                    });
                    return;
                }

                alert('Пользователь "' + userLogin + '" успешно отредактирован.');

                dispatch({
                    type: actions.EDIT_USER_CLEAR_FORM,
                    payload: null
                });

                history.push('/users');
            })
            .catch((error) => {
                console.log('error', error);
                const {message, statusText} = error;
                const errorMessage = statusText ? statusText : message;
                dispatch({ type: actions.EDIT_USER_STOP_LOADING, payload: { errorText: '' } });
                dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
            });
    }
};

export const setEditUserFormData = (formData) => {
    return {
        type: actions.EDIT_USER_SET_FORM_DATA,
        payload: formData
    }
};