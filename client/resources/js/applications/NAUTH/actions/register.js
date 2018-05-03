import actions from '../../../config/actions';

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