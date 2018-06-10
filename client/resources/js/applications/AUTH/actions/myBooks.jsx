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
            url: createUrl(defaultSettings, urlSettings['myBooks'])
            data: JSON.stringify({...queryData, ...actionData})
        })
        .then( (response) => {

            const responseData = response.data || {};

            if (!response.isSuccess) {
                const {message} = response;
                dispatch({ type: actions.MY_BOOKS_STOP_LOADING, payload: null });
                dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: message });
                return;
            }

            const {data: {data = {}}} = response;
            const {collection = [], filter = {}, paging = {}} = data;

            dispatch({
                type: 'MY_BOOKS_LIST_LOADED',
                payload: {collection, ...filter, ...paging}
            })
        })
        .catch((error) => {
            console.log('error', error);
            const {message} = error;
            dispatch({ type: actions.MY_BOOKS_STOP_LOADING, payload: null });
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: message });
        });

    }
};

export const asyncSendMyBookToMail = (bookId, emailToSend) => {
    return dispatch => {

        const urlToSend = `${createUrl(defaultSettings, urlSettings['toMail'])}${bookId}`;

        Request.send({
            url: urlToSend,
            data: JSON.stringify({
                email: emailToSend
            })
        })
        .then( (response) => {

            if (!response.isSuccess) {
                const {message} = response;
                dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: message });
                return;
            }

            alert('Книга успешно отправлена по почте.');
        })
        .catch((error) => {

            const {message = ''} = error;
            dispatch({ type: actions.COMMON_ADD_GLOBAL_ERROR, payload: message });
        });

    }
};

export const asyncDeleteMyBook = (bookId, loadBooksCallback) => {
    return dispatch => {

        const urlToSend = `${createUrl(defaultSettings, urlSettings['deleteMyBook'])}${bookId}`;

        dispatch({
            type: 'START_BOOKS_LOADING',
            payload: {}
        });

        Axios.get(urlToSend)
            .then( (response) => {

                const responseData = response.data || {};

                if (!responseData.isSuccess) {
                    dispatch({
                        type: 'ERROR_BOOKS_LOADING',
                        payload: {
                            errorMessage: responseData.message
                        }
                    });
                    return;
                }

                alert('Книга успешно удалена.');
                loadBooksCallback();
            })
            .catch((error) => {

                const {message = ''} = error;
                dispatch({
                    type: 'ERROR_BOOKS_LOADING',
                    payload: {
                        errorMessage: message
                    }
                });
            });
    }
};