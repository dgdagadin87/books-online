import actions from '../../../config/actions';
import Request from '../../../core/request';
import {createUrl} from '../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../config/settings';

export const asyncGetAddBook = (isLoaded, actionData, queryData) => {
    return dispatch => {

        const startLoadingAction = isLoaded === false ? 'ADD_BOOK_START_GLOBAL_LOADING' : 'ADD_BOOK_START_LOADING';

        dispatch({
            type: actions[startLoadingAction],
            payload: actionData
        });

        Request.send({
            url: createUrl(defaultSettings, urlSettings['getAddBook']),
            data: {...queryData, ...actionData}
        })
        .then( (response) => {

            const {collection = [], filter = {}, paging = {}, isFoundInMy, isFoundInAll, sites = []} = response;

            dispatch({
                type: actions.ADD_BOOK_STOP_LOADING,
                payload: {collection, ...filter, ...paging, isFoundInMy, isFoundInAll, sites}
            })
        })
        .catch((error) => {
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.ADD_BOOK_STOP_LOADING, payload: {} });
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });
    }
};

export const setAddBookFormData = (formData) => {
    return {
        type: actions.ADD_BOOK_SET_FORM_DATA,
        payload: formData
    }
};

export const showAddBookPopup = (payload) => {
    return {
        type: actions.ADD_BOOK_SHOW_POPUP,
        payload: payload
    }
};