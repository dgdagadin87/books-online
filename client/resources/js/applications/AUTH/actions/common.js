import actions from '../../../config/actions';

export const changeTitle = (title) => {
    return {
        type: actions.COMMON_SET_TITLE,
        payload: title
    }
};

export const setGlobalError = (errorText) => {
    return {
        type: actions.COMMON_ADD_GLOBAL_ERROR,
        payload: errorText
    }
};