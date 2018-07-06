import actions from '../../../../config/actions';

const initialState = {
    userId: null,
    userLogin: '',
    userName: '',
    userIsAdmin: false,
    errorText: '',
    disabled: false,
    isLoaded: false
};

export default function (state = null, action) {

    let {payload} = action;

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case actions.EDIT_USER_STOP_LOADING:
            return {...returnState, ...payload, disabled: false};
        case actions.EDIT_USER_STOP_GET_LOADING:
            return {...returnState, ...payload, disabled: false, isLoaded: true};
        case actions.EDIT_USER_START_LOADING:
            return {...returnState, disabled: true, errorText: ''};
        case actions.EDIT_USER_SET_FORM_DATA:
            return {...returnState, ...payload};
        case actions.EDIT_USER_CLEAR_FORM:
            return initialState;
        default:
            return returnState;

    }
}