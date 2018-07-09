import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {changeEmail, changePassword, asyncLogin} from '../../actions/login';

const mapStateToProps = (state) => {
    return {
        disabled: state.commonData.disabled,
        email: state.loginData.email,
        password: state.loginData.password,
        clientErrors: state.loginData.clientErrors,
        serverErrors: state.loginData.serverErrors
    };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        changeEmail,
        changePassword,
        asyncLogin
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

    _onClickHandler() {

        const {email, password, asyncLogin} = this.props;

        asyncLogin(email, password);
    }

    _renderErrorItem(error, index) {

        return <div key={index}>{error}</div>;
    }

    _renderServerErrors() {

        const {serverErrors = []} = this.props;

        if (serverErrors.length < 1) {
            return null;
        }

        return (
            <div className="login-error-block">
                {serverErrors.map((item, index) => this._renderErrorItem(item, index))}
            </div>
        );
    }

    render() {

        const {email, password, clientErrors, disabled} = this.props;
        const isButtonDisabled = !email || !password;

        return (
            <div className="login-center">
                <div className="login-block">
                    <div className="login-header">
                        Авторизация в системе
                    </div>
                    <div className="controls-container">
                        {this._renderServerErrors()}
                        <div>
                            <input
                                disabled={disabled}
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
                                disabled={disabled}
                                style={clientErrors.password ? {border:'1px solid red'} : {}}
                                type="password"
                                value={password}
                                placeholder="Введите пароль"
                                onChange={this._handlePasswordInput.bind(this)}
                            />
                            {clientErrors.password ? <div style={{color:'red'}}>{clientErrors.password}</div> : null}
                        </div>
                        <div className="buttons">
                            <button
                                disabled={disabled || isButtonDisabled}
                                onClick={this._onClickHandler.bind(this)}
                            >
                                Войти
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);