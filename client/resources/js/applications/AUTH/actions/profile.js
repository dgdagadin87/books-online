import actions from '../../../config/actions';
import Request from '../../../core/request';
import {createUrl} from '../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../config/settings';

export const asyncEditProfile = (userName) => {
    return dispatch => {

        dispatch({
            type: actions.EDIT_PROFILE_START_LOADING,
            payload: null
        });

        Request.send({
            type: 'post',
            url: createUrl(defaultSettings, urlSettings['editProfile']),
            data: JSON.stringify({userName})
        })
        .then( (response) => {

            if (response.hasError === true) {
                dispatch({
                    type: actions.EDIT_PROFILE_STOP_LOADING,
                    payload: { errorText: response.errorText }
                });
                return;
            }

            alert('Ваш профиль успешно отредактирован.');

            dispatch({
                type: actions.COMMON_SET_USER_DATA_AFTER_EDIT,
                payload: {userName}
            });

            history.push('/users');
        })
        .catch((error) => {
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.EDIT_PROFILE_STOP_LOADING, payload: { errorText: '' } });
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });
    }
};

export const setProfileFormData = (formData) => {
    return {
        type: actions.EDIT_PROFILE_SET_FORM_DATA,
        payload: formData
    }
};