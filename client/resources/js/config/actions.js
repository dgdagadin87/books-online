const actions = {

    // COMMON
    COMMON_SET_USER_DATA: 'COMMON_SET_USER_DATA',
    COMMON_SET_USER_DATA_AFTER_EDIT: 'COMMON_SET_USER_DATA_AFTER_EDIT',
    COMMON_SET_TITLE: 'COMMON_SET_TITLE',
    COMMON_ADD_GLOBAL_ERROR: 'COMMON_ADD_GLOBAL_ERROR',
    COMMON_CLEAR_GLOBAL_ERRORS: 'COMMON_CLEAR_GLOBAL_ERRORS',
    COMMON_NAUTH_DISABLED: 'COMMON_NAUTH_DISABLED',

    // LOGIN
    LOGIN_INPUT_CHANGE_MAIL: 'LOGIN_INPUT_CHANGE_MAIL',
    LOGIN_INPUT_CHANGE_PASSWORD: 'LOGIN_INPUT_CHANGE_PASSWORD',
    LOGIN_SET_SERVER_ERRORS: 'LOGIN_SET_SERVER_ERRORS',

    // MY BOOKS
    MY_BOOKS_START_GLOBAL_LOADING: 'MY_BOOKS_START_GLOBAL_LOADING',
    MY_BOOKS_START_LOADING: 'MY_BOOKS_START_LOADING',
    MY_BOOKS_STOP_LOADING: 'MY_BOOKS_STOP_LOADING',
    MY_BOOKS_ERROR_BOOKS_LOADING: 'MY_BOOKS_ERROR_BOOKS_LOADING',
    MY_BOOKS_SET_DEFAULT_SEARCH_TERM: 'MY_BOOKS_SET_DEFAULT_SEARCH_TERM',
    MY_BOOKS_SET_DEFAULT: 'MY_BOOKS_SET_DEFAULT',

    // ALL BOOKS
    ALL_BOOKS_START_GLOBAL_LOADING: 'ALL_BOOKS_START_GLOBAL_LOADING',
    ALL_BOOKS_START_LOADING: 'ALL_BOOKS_START_LOADING',
    ALL_BOOKS_STOP_LOADING: 'ALL_BOOKS_STOP_LOADING',
    ALL_BOOKS_ERROR_BOOKS_LOADING: 'ALL_BOOKS_ERROR_BOOKS_LOADING',
    ALL_BOOKS_SET_DEFAULT_SEARCH_TERM: 'ALL_BOOKS_SET_DEFAULT_SEARCH_TERM',
    ALL_BOOKS_SET_DEFAULT: 'ALL_BOOKS_SET_DEFAULT',

    // USERS
    USERS_START_GLOBAL_LOADING: 'USERS_START_GLOBAL_LOADING',
    USERS_START_LOADING: 'USERS_START_LOADING',
    USERS_STOP_LOADING: 'USERS_STOP_LOADING',
    USERS_ERROR_BOOKS_LOADING: 'USERS_ERROR_BOOKS_LOADING',
    USERS_SET_DEFAULT: 'USERS_SET_DEFAULT',

    // ADD USER
    ADD_USER_START_LOADING: 'ADD_USER_START_LOADING',
    ADD_USER_STOP_LOADING: 'ADD_USER_STOP_LOADING',
    ADD_USER_SET_FORM_DATA: 'ADD_USER_SET_FORM_DATA',
    ADD_USER_CLEAR_FORM: 'ADD_USER_CLEAR_FORM',

    // EDIT USER
    EDIT_USER_START_LOADING: 'EDIT_USER_START_LOADING',
    EDIT_USER_STOP_LOADING: 'EDIT_USER_STOP_LOADING',
    EDIT_USER_STOP_GET_LOADING: 'EDIT_USER_STOP_GET_LOADING',
    EDIT_USER_SET_FORM_DATA: 'EDIT_USER_SET_FORM_DATA',
    EDIT_USER_CLEAR_FORM: 'EDIT_USER_CLEAR_FORM',

    // ADD BOOK
    ADD_BOOK_START_GLOBAL_LOADING: 'ADD_BOOK_START_GLOBAL_LOADING',
    ADD_BOOK_START_LOADING: 'ADD_BOOK_START_LOADING',
    ADD_BOOK_STOP_LOADING: 'ADD_BOOK_STOP_LOADING',
    ADD_BOOK_SET_FORM_DATA: 'ADD_BOOK_SET_FORM_DATA',
    ADD_BOOK_SHOW_POPUP: 'ADD_BOOK_SHOW_POPUP',

    // PROFILE
    EDIT_PROFILE_START_LOADING: 'EDIT_PROFILE_START_LOADING',
    EDIT_PROFILE_STOP_LOADING: 'EDIT_PROFILE_STOP_LOADING',
    EDIT_PROFILE_SET_FORM_DATA: 'EDIT_PROFILE_SET_FORM_DATA',

    // NOTIFICATIONS
    NOTIFICATIONS_SET_DATA: 'NOTIFICATIONS_SET_DATA',
    NOTIFICATIONS_SET_DISPLAY_LIST: 'NOTIFICATIONS_SET_DISPLAY_LIST'

};

export default actions;
