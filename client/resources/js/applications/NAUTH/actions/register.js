import actions from '../../../config/actions';
import Request from '../../../core/request';
import {createUrl} from '../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../config/settings';

export const asyncRegister = (email, name, password, repeatPassword) => {
    return dispatch => {

        dispatch({
            type: actions.COMMON_NAUTH_DISABLED,
            payload: true
        });

        Request.send({
            url: createUrl(defaultSettings, urlSettings['register']),
            data: JSON.stringify({email, name, password, repeatPassword}),
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
                    type: actions.REGISTER_SET_SERVER_ERRORS,
                    payload: errors
                });
                return;
            }

            dispatch({
                type: actions.REGISTER_SET_CURRENT_STEP,
                payload: 'final'
            });
        })
        .catch((error) => {
            console.log('error', error);
            dispatch({
                type: actions.COMMON_NAUTH_DISABLED,
                payload: false
            });
        });

    }
};

export const changeEmail = (email) => {
    return {
        type: actions.REGISTER_INPUT_CHANGE_MAIL,
        payload: email
    }
};

export const changeName = (email) => {
    return {
        type: actions.REGISTER_INPUT_CHANGE_NAME,
        payload: email
    }
};

export const changePassword = (password) => {
    return {
        type: actions.REGISTER_INPUT_CHANGE_PASSWORD,
        payload: password
    }
};

export const changeRepeatPassword = (repeatPassword) => {
    return {
        type: actions.REGISTER_INPUT_CHANGE_REPEAT_PASSWORD,
        payload: repeatPassword
    }
};