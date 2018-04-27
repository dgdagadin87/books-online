import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {changeEmail, changePassword} from '../../actions/login';

import MenuLinkComponent from '../common/MenuLinkComponent';

const mapStateToProps = (state) => {
    return {
        email: state.loginData.email,
        password: state.loginData.password,
        clientErrors: state.loginData.clientErrors
    };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        changeEmail,
        changePassword
    }, dispatch);
}

class Login extends Component {

    _handleEmailInput(ev) {

        const {changeEmail} = this.props;

        const value = ev.currentTarget.value;

        changeEmail(value);

    }

    _handlePasswordInput(ev) {

        const {changePassword} = this.props;

        const value = ev.currentTarget.value;

        changePassword(value);
    }

    render() {

        const {email, password, clientErrors} = this.props;
        const isButtonDisabled = !email || !password;

        return (
            <div>
                <div>
                    Авторизация в системе
                </div>
                <div>
                    <div>
                        <input
                            style={clientErrors.email ? {border:'1px solid red'} : {}}
                            type="text"
                            value={email}
                            placeholder="Введите email"
                            onChange={this._handleEmailInput.bind(this)}
                        />
                        {clientErrors.email ? <div style={{color:'red'}}>{clientErrors.email}</div> : null}
                    </div>
                    <div>
                        <input
                            style={clientErrors.password ? {border:'1px solid red'} : {}}
                            type="password"
                            value={password}
                            placeholder="Введите пароль"
                            onChange={this._handlePasswordInput.bind(this)}
                        />
                        {clientErrors.password ? <div style={{color:'red'}}>{clientErrors.password}</div> : null}
                    </div>
                    <div>
                        <MenuLinkComponent
                            activeOnlyWhenExact={true}
                            to={'/register'}
                            label={'Регистрация'}
                        />
                        <span>&nbsp;</span>
                        <MenuLinkComponent
                            activeOnlyWhenExact={true}
                            to={'/reset'}
                            label={'Забыли пароль?'}
                        />
                    </div>
                    <div>
                        <button
                            disabled={isButtonDisabled}
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);