import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {changeTitle} from '../../actions/common';
import {
    asyncGetUser,
    asyncEditUser,
    setEditUserFormData
} from '../../actions/editUser';

import {isEmpty} from '../../../../core/coreUtils';

import NoAccessModule from '../partials/NoAccessComponent';
import UserFormComponent from '../partials/UserFormComponent';

const mapStateToProps = (state) => {
    return {
        userData: state.commonData.userData,
        userId:  state.editUserData.userId,
        userLogin: state.editUserData.userLogin,
        userName: state.editUserData.userName,
        userIsAdmin: state.editUserData.userIsAdmin,
        errorText: state.editUserData.errorText,
        disabled: state.editUserData.disabled
    };
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        setTitle: changeTitle,
        asyncGetUser: asyncGetUser,
        asyncEditUser: asyncEditUser,
        setFormData: setEditUserFormData
    }, dispatch);
}

class EditUserComponent extends Component {

    constructor(props) {
        super(props);

        let {setTitle} = this.props;

        setTitle('Редактировать пользователя');
    }

    componentWillReceiveProps() {}

    componentDidMount() {

        const {match, asyncGetUser} = this.props;
        const {params} = match;
        const {id} = params;

        asyncGetUser(id);
    }

    _setParentState(state) {

        const {setFormData} = this.props;

        setFormData(state);
    }

    _renderNoAccess() {
        
        return (<NoAccessModule />);
    }

    _handleClick() {

        const {history, asyncEditUser} = this.props;
        const {disabled, userLogin, userId, userName, userIsAdmin} = this.props;

        if (disabled) {
            return;
        }

        if (disabled) {
            return;
        }

        asyncEditUser(history, userId, userLogin, userName, userIsAdmin);
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
    
    _handleReturn() {

        const {history} = this.props;

        history.push('/users');
    }

    _renderEditUser() {
        
        const {userLogin, userName, userIsAdmin, disabled} = this.props;
        
        let editUserArray = [];
        
        editUserArray.push(this._renderError());
        
        editUserArray.push(
            <div key={0} className="add-user__title">
                Редактирование пользователя
            </div>
        );

        editUserArray.push(
            <UserFormComponent
                key={2}
                disabled={disabled}
                mode={'edit'}
                userLogin={userLogin}
                userName={userName}
                userIsAdmin={userIsAdmin}
                setParentState={this._setParentState.bind(this)}
            />
        );

        editUserArray.push(
            <div key={3} className="user-form__row buttons">
                <button
                    className="user-form__button"
                    disabled={disabled || isEmpty(userLogin) || isEmpty(userName)}
                    onClick={this._handleClick.bind(this)}
                >
                    Редактировать
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

        return editUserArray;
    }

    render() {

        const {userData} = this.props;
        const {user} = userData;

        return (
            <div className="add-user__container">
                {user.userIsAdmin ? this._renderEditUser() : this._renderNoAccess()}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserComponent);