import actions from '../../../../config/actions';

const initialState = {
    disabled: false
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.COMMON_NAUTH_DISABLED:
            return {
                disabled: action.payload
            };

        default:
            return state;

    }
}