import actions from '../../../config/actions';

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