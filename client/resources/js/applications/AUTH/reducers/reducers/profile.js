import actions from '../../../../config/actions';

const initialState = {
    profileLogin: '',
    profileName: '',
    disabled: false,
    isLoaded: false
};

export default function (state = null, action) {

    let {payload} = action;

    let returnState = !!state ? state : initialState;

    switch (action.type) {
        case actions.EDIT_PROFILE_STOP_LOADING:
            return {...returnState, ...payload, disabled: false};
        case actions.EDIT_PROFILE_START_LOADING:
            return {...returnState, disabled: true, errorText: ''};
        case actions.EDIT_PROFILE_SET_FORM_DATA:
            return {...returnState, ...payload};
        default:
            return returnState;

    }
}