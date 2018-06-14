import actions from '../../../config/actions';
import Request from '../../../core/request';
import {createUrl} from '../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../config/settings';

export const asyncAddUser = (history, userLogin, userName, userIsAdmin) => {
    return dispatch => {

        dispatch({
            type: actions.ADD_USER_START_LOADING,
            payload: null
        });

        Request.send({
            type: 'post',
            url: createUrl(defaultSettings, urlSettings['addUser']),
            data: JSON.stringify({userLogin, userName, userIsAdmin})
        })
        .then( (response) => {

            if (response.hasError === true) {
                dispatch({
                    type: actions.ADD_USER_STOP_LOADING,
                    payload: { errorText: response.errorText }
                });
                return;
            }

            alert('Пользователь успешно добавлен.');

            dispatch({
                type: actions.ADD_USER_CLEAR_FORM,
                payload: null
            });

            history.push('/users');
        })
        .catch((error) => {
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.ADD_USER_STOP_LOADING, payload: { errorText: '' } });
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });
    }
};

export const setAddUserFormData = (formData) => {
    return {
        type: actions.ADD_USER_SET_FORM_DATA,
        payload: formData
    }
};