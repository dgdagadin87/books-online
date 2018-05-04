import actions from '../../../../config/actions';

const initialState = {
    disabled: false,
    errors: []
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.COMMON_NAUTH_DISABLED:
            return {...state, disabled: action.payload};

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