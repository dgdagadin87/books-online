import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    changeEmail,
    changeName,
    changePassword,
    changeRepeatPassword,
    asyncRegister
} from '../../actions/register';

import MenuLinkComponent from '../common/MenuLinkComponent';

const mapStateToProps = (state) => {
    return {
        disabled: state.commonData.disabled,
        email: state.registerData.email,
        name: state.registerData.name,
        password: state.registerData.password,
        repeatPassword: state.registerData.repeatPassword,
        clientErrors: state.registerData.clientErrors,
        serverErrors: state.registerData.serverErrors,
        step: state.registerData.step
    };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        changeEmail,
        changeName,
        changePassword,
        changeRepeatPassword,
        asyncRegister
    }, dispatch);
}

class Login extends Component {

    _handleEmailInput(ev) {

        const {changeEmail} = this.props;

        const value = ev.currentTarget.value;

        changeEmail(value);

    }

    _handleNameInput(ev) {

        const {changeName} = this.props;

        const value = ev.currentTarget.value;

        changeName(value);

    }

    _handlePasswordInput(ev) {

        const {changePassword} = this.props;

        const value = ev.currentTarget.value;

        changePassword(value);
    }

    _handleRepeatPasswordInput(ev) {

        const {changeRepeatPassword} = this.props;

        const value = ev.currentTarget.value;

        changeRepeatPassword(value);
    }

    _isButtonDisabled() {

        const {email, name, password, repeatPassword, clientErrors} = this.props;
        const hasErrors = clientErrors.email || clientErrors.name || clientErrors.password || clientErrors.repeatPassword;
        const hasInputErrors = !email || !name || !password || !repeatPassword;

        return hasErrors || hasInputErrors;
    }

    _onClickHandler() {

        const {email, name, password, repeatPassword, asyncRegister} = this.props;

        asyncRegister(email, name, password, repeatPassword);
    }

    _renderErrorItem(error, index) {

        return <div key={index} style={{color: 'red'}}>{error}</div>;
    }

    _renderServerErrors() {

        const {serverErrors = []} = this.props;

        if (serverErrors.length < 1) {
            return null;
        }

        return (
            <div>
                {serverErrors.map((item, index) => this._renderErrorItem(item, index))}
            </div>
        );
    }

    _renderForm() {

        const {email, name, password, repeatPassword, clientErrors, disabled} = this.props;

        return (
            <div>
                <div>
                    Регистрация в системе
                </div>
                <div>
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
                            style={clientErrors.name ? {border:'1px solid red'} : {}}
                            type="text"
                            value={name}
                            placeholder="Введите имя"
                            onChange={this._handleNameInput.bind(this)}
                        />
                        {clientErrors.name ? <div style={{color:'red'}}>{clientErrors.name}</div> : null}
                    </div>
                    <div style={{marginTop:'20px'}}>
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
                    <div>
                        <input
                            disabled={disabled}
                            style={clientErrors.repeatPassword ? {border:'1px solid red'} : {}}
                            type="password"
                            value={repeatPassword}
                            placeholder="Повторите пароль"
                            onChange={this._handleRepeatPasswordInput.bind(this)}
                        />
                        {clientErrors.repeatPassword ? <div style={{color:'red'}}>{clientErrors.repeatPassword}</div> : null}
                    </div>
                    <div>
                        <MenuLinkComponent
                            activeOnlyWhenExact={true}
                            to={'/'}
                            label={'Войти'}
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
                            disabled={disabled || this._isButtonDisabled()}
                            onClick={this._onClickHandler.bind(this)}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    _renderMessage() {

        const enterLink = (<MenuLinkComponent activeOnlyWhenExact={true} to={'/'} label={'Войти'} />);

        return (
            <div>Регистрация завершена успешно. Вы можете {enterLink}, используя введенные ранее почту и пароль.</div>
        );
    }

    render() {

        const {step} = this.props;

        return step === 'final' ? this._renderMessage() : this._renderForm();
    }

}

export default connect(mapStateToProps, matchDispatchToProps)(Login);