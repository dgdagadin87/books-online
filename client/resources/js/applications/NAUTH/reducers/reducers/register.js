import actions from '../../../../config/actions';
import {checkEmail} from '../../../../core/coreUtils';

const initialState = {
    step: 'start',
    email: '',
    name: '',
    password: '',
    repeatPassword: '',
    clientErrors: {
        email: '',
        name: '',
        password: '',
        repeatPassword: ''
    },
    serverErrors: []
};

export default function (state = initialState, action) {

    const {payload} = action;
    const {clientErrors} = state;

    switch (action.type) {

        case actions.REGISTER_INPUT_CHANGE_MAIL:
            let emailError = '';
            if (!payload) {
                emailError = 'Поле "Email" не должно быть пустым';
            }
            else if (!checkEmail(payload)) {
                emailError = 'Неправильный формат email-адреса';
            }
            return {...state, email: payload, clientErrors: {...clientErrors, email: emailError}};

        case actions.REGISTER_INPUT_CHANGE_NAME:
            let nameError = '';
            if (!payload) {
                nameError = 'Поле "Имя" не должно быть пустым';
            }
            else if (payload.length < 5 || payload.length > 10) {
                nameError = 'Поле "Имя" должно быть от 5 до 10 символов';
            }
            return {...state, name: payload, clientErrors: {...clientErrors, name: nameError}};

        case actions.REGISTER_INPUT_CHANGE_PASSWORD:
            let passwordError = '';
            if (!payload) {
                passwordError = 'Поле "Пароль" не должно быть пустым';
            }
            else if (payload.length < 6) {
                passwordError = 'Длина пароля не должна быть менее 6 символов';
            }
            return {...state, password: payload, clientErrors: {...clientErrors, password: passwordError}};

        case actions.REGISTER_INPUT_CHANGE_REPEAT_PASSWORD:
            let repeatPasswordError = '';
            if (!payload) {
                repeatPasswordError = 'Поле "Повторите пароль" не должно быть пустым';
            }
            else {
                const {password} = state;
                if (password !== payload) {
                    repeatPasswordError = 'Введенные пароли не совпадают';
                }
            }
            return {...state, repeatPassword: payload, clientErrors: {...clientErrors, repeatPassword: repeatPasswordError}};

        case actions.REGISTER_SET_SERVER_ERRORS:
            return {...state, serverErrors: payload};

        case actions.REGISTER_SET_CURRENT_STEP:
            return {...state, step: payload};

        default:
            return state;

    }
}