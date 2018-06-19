import actions from '../../../config/actions';
import Request from '../../../core/request';
import {createUrl} from '../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../config/settings';

export const asyncGetAllBooks = (collection, actionData, queryData) => {
    return dispatch => {

        const startLoadingAction = collection === false ? 'ALL_BOOKS_START_GLOBAL_LOADING' : 'ALL_BOOKS_START_LOADING';

        dispatch({
            type: actions[startLoadingAction],
            payload: actionData
        });

        Request.send({
            url: createUrl(defaultSettings, urlSettings['allBooks']),
            data: {...queryData, ...actionData}
        })
        .then( (response) => {

            const {collection = [], filter = {}, paging = {}} = response;

            dispatch({
                type: actions.ALL_BOOKS_STOP_LOADING,
                payload: {collection, ...filter, ...paging}
            })
        })
        .catch((error) => {
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.ALL_BOOKS_STOP_LOADING, payload: null });
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });
    }
};

export const asyncDeleteBook = (bookId, loadBooksCallback) => {
    return dispatch => {

        const urlToSend = `${createUrl(defaultSettings, urlSettings['deleteBook'])}${bookId}`;

        dispatch({
            type: actions.ALL_BOOKS_START_LOADING,
            payload: {}
        });

        Request.send({
            url: urlToSend
        })
        .then( () => {

            alert('Книга успешно удалена.');
            loadBooksCallback();
        })
        .catch((error) => {

            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.ALL_BOOKS_STOP_LOADING, payload: null });
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });
    }
};

export const setAllBooksSearchTerm = (searchTerm) => {
    return {
        type: actions.ALL_BOOKS_SET_DEFAULT_SEARCH_TERM,
        payload: searchTerm
    }
};