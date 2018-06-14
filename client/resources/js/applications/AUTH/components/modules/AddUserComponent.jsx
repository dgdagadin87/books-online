import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {changeTitle} from '../../actions/common';
import { asyncAddUser, setAddUserFormData } from '../../actions/addUser';

import {isEmpty} from '../../../../core/coreUtils';

import NoAccessModule from '../partials/NoAccessComponent';
import UserFormComponent from '../partials/UserFormComponent';

const mapStateToProps = (state) => {
    return {
        userData: state.commonData.userData,
        userLogin: state.addUserData.userLogin,
        userName: state.addUserData.userName,
        userIsAdmin: state.addUserData.userIsAdmin,
        errorText: state.addUserData.errorText,
        disabled: state.addUserData.disabled
    };
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        setTitle: changeTitle,
        asyncAddUser: asyncAddUser,
        setFormData: setAddUserFormData
    }, dispatch);
}

class AddUserComponent extends Component {

    constructor(props) {
        super(props);

        let {setTitle} = this.props;

        setTitle('Добавить пользователя');
    }

    _setParentState(state) {

        const {setFormData} = this.props;

        setFormData(state);
    }

    _renderError() {
        
        const {errorText} = this.props;
        
        if (isEmpty(errorText)) {
            return null;
        }
        
        return (
            <div key={1} className="add-user__error">
                <strong>Ошибка!</strong> {errorText}
            </div>
        );
    }

    _renderNoAccess() {
        
        return (<NoAccessModule />);
    }

    _handleClick() {

        const {history, asyncAddUser} = this.props;
        const {disabled, userLogin, userName, userIsAdmin} = this.props;

        if (disabled) {
            return;
        }

        asyncAddUser(history, userLogin, userName, userIsAdmin);
    }
    
    _handleReturn() {

        const {history} = this.props;

        history.push('/users');
    }

    _renderAddUser() {
        
        const {userLogin, userName, userIsAdmin, disabled} = this.props;
        
        let addUserArray = [];
        
        addUserArray.push(this._renderError());
        
        addUserArray.push(
            <div key={0} className="add-user__title">
                Добавление пользователя в систему
            </div>
        );

        addUserArray.push(
            <UserFormComponent
                key={2}
                disabled={disabled}
                userLogin={userLogin}
                userName={userName}
                userIsAdmin={userIsAdmin}
                setParentState={this._setParentState.bind(this)}
            />
        );

        addUserArray.push(
            <div key={3} className="user-form__row buttons">
                <button
                    className="user-form__button"
                    disabled={disabled || isEmpty(userLogin) || isEmpty(userName)}
                    onClick={this._handleClick.bind(this)}
                >
                    Добавить
                </button>
                <button
                    className="user-form__button"
                    disabled={disabled}
                    onClick={this._handleReturn.bind(this)}
                >
                    Вернуться
                </button>
            </div>
        );

        return addUserArray;
    }

    render() {

        const {userData} = this.props;
        const {user} = userData;

        return (
            <div className="add-user__container">
                {user.userIsAdmin ? this._renderAddUser() : this._renderNoAccess()}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserComponent);