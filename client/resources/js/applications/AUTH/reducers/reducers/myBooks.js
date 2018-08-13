import actions from '../../../../config/actions';

const initialState = {
    collection: false,
    sortField: 'bookName',
    sortType: 'ASC',
    searchTerm: '',
    page: 1,
    pages: 1,
    totalCount: 0,
    disabled: false,
    globalLoading: false
};

export default function (state = null, action) {

    let {payload} = action;

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case actions.MY_BOOKS_STOP_LOADING:
            return {...returnState, ...payload, disabled: false, globalLoading: false};
        case actions.MY_BOOKS_START_LOADING:
            return {...returnState, ...payload, disabled: true, globalLoading: false};
        case actions.MY_BOOKS_START_GLOBAL_LOADING:
            return {...returnState, ...payload, disabled: false, globalLoading: true};
        case actions.MY_BOOKS_SET_DEFAULT_SEARCH_TERM:
            return {...initialState, searchTerm: payload};
        case actions.MY_BOOKS_SET_DEFAULT:
            return {...initialState};
        default:
            return returnState;

    }
}