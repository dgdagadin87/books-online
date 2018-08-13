import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {changeTitle} from '../../actions/common';
import { asyncEditProfile, setProfileFormData } from '../../actions/profile';

import {isEmpty} from '../../../../core/coreUtils';

const mapStateToProps = (state) => {
    return {
        userData: state.commonData.userData,
        profileLogin: state.profileData.profileLogin,
        profileName: state.profileData.profileName,
        nameError: state.profileData.nameError,
        errorText: state.profileData.errorText,
        disabled: state.profileData.disabled
    };
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        setTitle: changeTitle,
        asyncEditProfile: asyncEditProfile,
        setFormData: setProfileFormData
    }, dispatch);
}

class ProfileComponent extends Component {

    constructor(props) {
        super(props);

        let {setTitle} = this.props;

        setTitle('Профиль');
    }

    componentDidMount() {

        const {userData: {user = {}}, setFormData} = this.props;
        const {userLogin, userName} = user;

        setFormData({
            profileLogin: userLogin,
            profileName: userName
        });
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

    _handleNameInput(event) {

        const {setFormData} = this.props;
        const value = event.currentTarget.value;

        setFormData({
            profileName: value,
            nameError: isEmpty(value)
        });
    }

    _handleClick() {

        const {asyncEditProfile, disabled, profileName} = this.props;

        if (disabled) {
            return;
        }

        alert('Функционал в разработке');

        //asyncEditProfile(profileName);
    }

    _renderProfileForm() {

        const {profileLogin, profileName, nameError, disabled} = this.props;

        return (
            <div key={2} className="user-form__container">
                <div className="user-form__row">
                    <div className="users-form__label-container">
                        <span className="user-form__label">
                            Ваш логин
                        </span>
                        <span className="user-form__strict">*</span>
                    </div>
                    <div className="users-form__input-container">
                        <input
                            type="text"
                            placeholder="Введите логин пользователя"
                            disabled={true}
                            value={profileLogin}
                            className="user-form__text-field"
                        />
                    </div>
                    <div className="clear-both" />
                </div>
                <div className="user-form__row">
                    <div className="users-form__label-container">
                        <span className="user-form__label">
                            Ваше имя
                        </span>
                        <span className="user-form__strict name">*</span>
                    </div>
                    <div className="users-form__input-container">
                        <input
                            type="text"
                            placeholder="Введите ваше имя"
                            disabled={disabled}
                            value={profileName}
                            onChange={this._handleNameInput.bind(this)}
                            className={'user-form__text-field' + ( nameError ? ' error' : '')}
                        />
                    </div>
                    <div className="clear-both" />
                </div>
            </div>
        );
    }

    _renderProfile() {
        
        const {profileLogin, profileName, disabled} = this.props;
        
        let profileArray = [];

        profileArray.push(this._renderError());

        profileArray.push(
            <div key={0} className="add-user__title">
                Редактирование вашего профиля
            </div>
        );

        profileArray.push(this._renderProfileForm());

        profileArray.push(
            <div key={3} className="user-form__row buttons">
                <button
                    className="user-form__button"
                    disabled={disabled || isEmpty(profileLogin) || isEmpty(profileName)}
                    onClick={this._handleClick.bind(this)}
                >
                    Редактировать
                </button>
            </div>
        );

        return profileArray;
    }

    render() {

        return (<div className="add-user__container">{this._renderProfile()}</div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);