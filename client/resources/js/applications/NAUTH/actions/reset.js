import actions from '../../../config/actions';
import Request from '../../../core/request';
import {createUrl} from '../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../config/settings';

export const asyncReset = (email, name, password, repeatPassword) => {
    return dispatch => {

        dispatch({
            type: actions.COMMON_NAUTH_DISABLED,
            payload: true
        });

        Request.send({
            url: createUrl(defaultSettings, urlSettings['reset']),
            data: JSON.stringify({email}),
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
                    type: actions.RESET_SET_SERVER_ERRORS,
                    payload: errors
                });
                return;
            }

            dispatch({
                type: actions.RESET_SET_CURRENT_STEP,
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
        type: actions.RESET_INPUT_CHANGE_MAIL,
        payload: email
    }
};