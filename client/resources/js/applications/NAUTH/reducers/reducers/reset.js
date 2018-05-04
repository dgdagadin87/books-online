import actions from '../../../../config/actions';
import {checkEmail} from '../../../../core/coreUtils';

const initialState = {
    step: 'start',
    email: '',
    clientErrors: {
        email: ''
    },
    serverErrors: []
};

export default function (state = initialState, action) {

    const {payload} = action;
    const {clientErrors} = state;

    switch (action.type) {

        case actions.RESET_INPUT_CHANGE_MAIL:
            let emailError = '';
            if (!payload) {
                emailError = 'Поле "Email" не должно быть пустым';
            }
            else if (!checkEmail(payload)) {
                emailError = 'Неправильный формат email-адреса';
            }
            return {...state, email: payload, clientErrors: {...clientErrors, email: emailError}};

        case actions.RESET_SET_SERVER_ERRORS:
            return {...state, serverErrors: payload};

        case actions.RESET_SET_CURRENT_STEP:
            return {...state, step: payload};

        default:
            return state;

    }
}