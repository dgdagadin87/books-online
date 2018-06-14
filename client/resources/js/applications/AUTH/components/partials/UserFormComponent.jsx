import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {isEmpty} from '../../../../core/coreUtils';

class UserFormComponent extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            mode: props.mode || 'add',
            userLogin: props.userLogin || '',
            userName: props.userName || '',
            userIsAdmin: props.userIsAdmin,
            disabled: props.disabled,
            loginError: false,
            nameError: false
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            userLogin: nextProps.userLogin || '',
            userName: nextProps.userName || '',
            userIsAdmin: nextProps.userIsAdmin,
            disabled: nextProps.disabled
        });
    }

    _handleLoginInput(event) {

        let value = event.currentTarget.value;

        this.setState({
            userLogin: value
        }, () => this._validateLoginInput());
    }
    
    _handleNameInput(event) {

        let value = event.currentTarget.value;

        this.setState({
            userName: value,
            nameError: false
        }, () => this._validateNameInput());
    }
    
    _handleAdminInput(event) {

        const {setParentState} = this.props;
        let {userIsAdmin} = this.state;
        
        let newValue = !userIsAdmin;

        this.setState({
            userIsAdmin: newValue
        }, () => setParentState({userIsAdmin: newValue}));
    }

    _validateLoginInput() {
        
        const {setParentState} = this.props;
        const {userLogin} = this.state;
        
        let loginError = false;
        
        if (isEmpty(userLogin)) {
            loginError = true;
        }
        
        this.setState({
            loginError: loginError
        }, () => setParentState({userLogin: userLogin}));
    }

    _validateNameInput() {
        
        const {setParentState} = this.props;
        const {userName} = this.state;
        
        let nameError = false;
        
        if (isEmpty(userName)) {
            nameError = true;
        }
        
        this.setState({
            nameError: nameError
        }, () => setParentState({userName: userName}));
    }

    render() {
        
        const {mode} = this.props;
        const {disabled, userLogin, userName, userIsAdmin, loginError, nameError} = this.state;

        return (
            <div className="user-form__container">
                <div className="user-form__row">
                    <div className="users-form__label-container">
                        <span className="user-form__label">
                            Логин пользователя
                        </span>
                        <span className="user-form__strict">*</span>
                    </div>
                    <div className="users-form__input-container">
                        <input
                            type="text"
                            placeholder="Введите логин пользователя"
                            disabled={disabled || mode === 'edit'}
                            value={userLogin}
                            onChange={this._handleLoginInput.bind(this)}
                            className={'user-form__text-field' + ( loginError ? ' error' : '')}
                        />
                    </div>
                    <div className="clear-both" />
                </div>
                <div className="user-form__row">
                    <div className="users-form__label-container">
                        <span className="user-form__label">
                            Имя пользователя
                        </span>
                        <span className="user-form__strict name">*</span>
                    </div>
                    <div className="users-form__input-container">
                        <input
                            type="text"
                            placeholder="Введите имя пользователя"
                            disabled={disabled}
                            value={userName}
                            onChange={this._handleNameInput.bind(this)}
                            className={'user-form__text-field' + ( nameError ? ' error' : '')}
                        />
                    </div>
                    <div className="clear-both" />
                </div>
                <div className="user-form__row">
                    <div className="users-form__label-container">
                        <span className="user-form__label admin">
                            Администратор
                        </span>
                    </div>
                    <div className="users-form__input-container">
                        <input
                            type="checkbox"
                            disabled={disabled}
                            checked={userIsAdmin}
                            onChange={this._handleAdminInput.bind(this)}
                            className={'user-form__checkbox-field'}
                        />
                    </div>
                    <div className="clear-both" />
                </div>
            </div>
        );
    }
}

UserFormComponent.propTypes = {
    userLogin: PropTypes.string,
    userName: PropTypes.string,
    userIsAdmin: PropTypes.bool,
    disabled: PropTypes.bool,
    setParentState: PropTypes.func
};

export default UserFormComponent;