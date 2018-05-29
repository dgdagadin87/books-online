import actions from '../../../../config/actions';

const initialState = {
    userData: {},
    sitesData: [],
    errors: [],
    title: 'Приложение "Книги" - начало'
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.COMMON_SET_USER_DATA:
            return {...state, userData: action.payload};

        case actions.COMMON_SET_TITLE:
            document.title = 'Приложение "Книги" - раздел "' + action.payload + '"';
            return {...state, title: action.payload};

        case actions.COMMON_ADD_GLOBAL_ERROR:
            const {errors} = state;
            const updatedErrors = errors.concat([action.payload]);
            return {...state, errors: updatedErrors};

        case actions.COMMON_CLEAR_GLOBAL_ERRORS:
            return {...state, errors: []};

        default:
            return state;

    }
}