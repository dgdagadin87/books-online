import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    changeEmail,
    asyncReset
} from '../../actions/reset';

import MenuLinkComponent from '../common/MenuLinkComponent';

const mapStateToProps = (state) => {
    return {
        disabled: state.commonData.disabled,
        email: state.resetData.email,
        clientErrors: state.resetData.clientErrors,
        serverErrors: state.resetData.serverErrors,
        step: state.resetData.step
    };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        changeEmail,
        asyncReset
    }, dispatch);
}

class Reset extends Component {

    _handleEmailInput(ev) {

        const {changeEmail} = this.props;

        const value = ev.currentTarget.value;

        changeEmail(value);

    }

    _isButtonDisabled() {

        const {email, clientErrors} = this.props;
        const hasErrors = clientErrors.email;
        const hasInputErrors = !email;

        return hasErrors || hasInputErrors;
    }

    _onClickHandler() {

        const {email, asyncReset} = this.props;

        asyncReset(email);
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
                    Востановление пароля
                </div>
                <div>
                    <small>
                        Введите электронную почту для восстановления пароля.
                    </small>
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
                        <MenuLinkComponent
                            activeOnlyWhenExact={true}
                            to={'/'}
                            label={'Войти'}
                        />
                        <span>&nbsp;</span>
                        <MenuLinkComponent
                            activeOnlyWhenExact={true}
                            to={'/register'}
                            label={'Регистрация'}
                        />
                    </div>
                    <div>
                        <button
                            disabled={disabled || this._isButtonDisabled()}
                            onClick={this._onClickHandler.bind(this)}
                        >
                            Восстановить пароль
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    _renderMessage() {

        const enterLink = (<MenuLinkComponent activeOnlyWhenExact={true} to={'/'} label={'войти'} />);

        return (
            <div>На введенную Вами почту отправлен новый пароль. Вы можете {enterLink}, используя его.</div>
        );
    }

    render() {

        const {step} = this.props;

        return step === 'final' ? this._renderMessage() : this._renderForm();
    }

}

export default connect(mapStateToProps, matchDispatchToProps)(Reset);