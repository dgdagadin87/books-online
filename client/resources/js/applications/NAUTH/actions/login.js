import actions from '../../../config/actions';
import Request from '../../../core/request';
import {createUrl} from '../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../config/settings';

export const changeEmail = (email) => {
    return {
        type: actions.LOGIN_INPUT_CHANGE_MAIL,
        payload: email
    }
};

export const changePassword = (password) => {
    return {
        type: actions.LOGIN_INPUT_CHANGE_PASSWORD,
        payload: password
    }
};

export const asyncLogin = (email, password) => {
    return dispatch => {

        dispatch({
            type: actions.COMMON_NAUTH_DISABLED,
            payload: true
        });

        Request.send({
            url: createUrl(defaultSettings, urlSettings['login']),
            data: JSON.stringify({email, password}),
            method: 'POST'
        })
        .then((data) => {

            const {errors = []} = data;

            dispatch({
                type: actions.COMMON_NAUTH_DISABLED,
                payload: false
            });

            if (errors.length > 0) {
                dispatch({
                    type: actions.LOGIN_SET_SERVER_ERRORS,
                    payload: errors
                });
                return;
            }

            window.location.href = '/';
        })
        .catch((error) => {
            console.log('error', error);
            const {message} = error;
            dispatch({ type: actions.COMMON_NAUTH_DISABLED, payload: false });
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: message });
        });

    }
};