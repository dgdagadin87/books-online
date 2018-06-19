import actions from '../../../config/actions';
import Request from '../../../core/request';
import {createUrl} from '../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../config/settings';

export const asyncGetMyBooks = (collection, actionData, queryData) => {
    return dispatch => {

        const startLoadingAction = collection === false ? 'MY_BOOKS_START_GLOBAL_LOADING' : 'MY_BOOKS_START_LOADING';

        dispatch({
            type: actions[startLoadingAction],
            payload: actionData
        });

        Request.send({
            url: createUrl(defaultSettings, urlSettings['myBooks']),
            data: JSON.stringify({...queryData, ...actionData})
        })
        .then( (response) => {

            const {collection = [], filter = {}, paging = {}} = response;

            dispatch({
                type: actions.MY_BOOKS_STOP_LOADING,
                payload: {collection, ...filter, ...paging}
            })
        })
        .catch((error) => {
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.MY_BOOKS_STOP_LOADING, payload: null });
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });
    }
};

export const asyncSendMyBookToMail = (bookId, emailToSend) => {
    return dispatch => {

        const urlToSend = `${createUrl(defaultSettings, urlSettings['toMail'])}${bookId}`;

        Request.send({
            url: urlToSend,
            type: 'post',
            data: JSON.stringify({
                email: emailToSend
            })
        })
        .then( () => {

            alert('Книга успешно отправлена по почте.');
        })
        .catch((error) => {

            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });

    }
};

export const asyncDeleteMyBook = (bookId, loadBooksCallback) => {
    return dispatch => {

        const urlToSend = `${createUrl(defaultSettings, urlSettings['deleteMyBook'])}${bookId}`;

        dispatch({
            type: actions.MY_BOOKS_START_LOADING,
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
            dispatch({ type: actions.MY_BOOKS_STOP_LOADING, payload: null });
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: errorMessage });
        });
    }
};

export const setMyBooksSearchTerm = (searchTerm) => {
    return {
        type: actions.MY_BOOKS_SET_DEFAULT_SEARCH_TERM,
        payload: searchTerm
    }
};