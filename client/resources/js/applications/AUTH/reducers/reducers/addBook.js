import actions from '../../../../config/actions';

const initialState = {
    disabled: false,
    globalLoading: false,
    isSelectError: false,
    isSearchError: false,
    isLoaded: false,
    collection: false,
    sites: false,
    isFoundInMy: false,
    isFoundInAll: false,
    searchTerm: '',
    selectedSiteId: -1,
    page: 1,
    pages: 1,
    totalCount: 0,

    showPopup: false,
    bookId: null,
    mode: 'download'
};

export default function (state = null, action) {

    let {payload} = action;

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case actions.ADD_BOOK_STOP_LOADING:
            return {...returnState, ...payload, disabled: false, globalLoading: false, isLoaded: true};
        case actions.ADD_BOOK_START_LOADING:
            return {...returnState, ...payload, disabled: true, globalLoading: false};
        case actions.ADD_BOOK_START_GLOBAL_LOADING:
            return {...returnState, ...payload, disabled: false, globalLoading: true};
        case actions.ADD_BOOK_SET_FORM_DATA:
            return {...returnState, ...payload};
        case actions.ADD_BOOK_SHOW_POPUP:
            return {...returnState, ...payload};
        default:
            return returnState;

    }
}