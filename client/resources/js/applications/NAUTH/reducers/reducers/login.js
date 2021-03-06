import actions from '../../../../config/actions';

const initialState = {
    email: '',
    password: '',
    clientErrors: {
        email: '',
        password: '',
    },
    serverErrors: []
};

export default function (state = initialState, action) {

    const {payload} = action;
    const {clientErrors} = state;

    switch (action.type) {

        case actions.LOGIN_INPUT_CHANGE_MAIL:
            let emailError = '';
            if (!payload) {
                emailError = 'Поле "Email" не должно быть пустым';
            }
            return {...state, email: payload, clientErrors: {...clientErrors, email: emailError}};

        case actions.LOGIN_INPUT_CHANGE_PASSWORD:
            let passwordError = '';
            if (!payload) {
                passwordError = 'Поле "Пароль" не должно быть пустым';
            }
            return {...state, password: payload, clientErrors: {...clientErrors, password: passwordError}};

        case actions.LOGIN_SET_SERVER_ERRORS:
            return {...state, serverErrors: payload};

        default:
            return state;

    }
}