import actions from '../../../../config/actions';

const initialState = {
    userLogin: '',
    userName: '',
    userIsAdmin: false,
    errorText: '',
    disabled: false
};

export default function (state = null, action) {

    let {payload} = action;

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case actions.ADD_USER_STOP_LOADING:
            return {...returnState, ...payload, disabled: false};
        case actions.ADD_USER_START_LOADING:
            return {...returnState, disabled: true, errorText: ''};
        case actions.ADD_USER_SET_FORM_DATA:
            return {...returnState, ...payload};
        case actions.ADD_USER_CLEAR_FORM:
            return initialState;
        default:
            return returnState;

    }
}