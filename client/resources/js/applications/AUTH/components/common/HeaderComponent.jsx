import React, {Component} from 'react';

import MenuLinkComponent from './MenuLinkComponent';

class Header extends Component {

    constructor(props) {
        super(props);

        const {serverData} = this.props;

        this.state = {
            serverData: serverData,
            showContext: false
        };
    }

    componentDidMount() {

        document.addEventListener('click', this._handlerHidePopup.bind(this));
    }

    componentWillUnmount() {

        document.removeEventListener('click', this._handlerHidePopup.bind(this));
    }

    _handlerHidePopup(ev) {

        if (ev.target.classList.contains('popup-prevent')) {
            return;
        }

        let {showContext} = this.state;

        if (!showContext) {
            return;
        }

        this.setState({
            showContext: false
        });
    }

    componentWillReceiveProps(props) {

        const {serverData} = props;

        this.setState({
            serverData: serverData,
            showContext: false
        });
    }

    _onUserIconClick() {

        this.setState({showContext: true})
    }

    _renderHeaderUrls() {

        let menuLinks = [];

        menuLinks.push(
            <MenuLinkComponent
                key={0}
                activeOnlyWhenExact={true}
                to={'/'}
                label={'Мои книги'}
            />
        );

        menuLinks.push(
            <MenuLinkComponent
                key={1}
                activeOnlyWhenExact={false}
                to={'/allbooks'}
                label={'Все книги'}
            />
        );

        menuLinks.push(
            <MenuLinkComponent
                key={2}
                activeOnlyWhenExact={false}
                to={'/addbook'}
                label={'Добавить книгу'}
            />
        );

        menuLinks.push(
            <MenuLinkComponent
                key={3}
                activeOnlyWhenExact={false}
                to={'/users'}
                label={'Пользователи'}
            />
        );

        menuLinks.push(
            <MenuLinkComponent
                key={4}
                activeOnlyWhenExact={false}
                to={'/about'}
                label={'О программе'}
            />
        );

        return menuLinks;
    }

    render() {

        const {serverData, showContext} = this.state;
        const {user} = serverData;
        const {userName} = user;

        return (
            <div className="main-navigation">
                <div className="main-navigation__links">
                    {this._renderHeaderUrls()}
                    <div className="clear-both" />
                </div>
                <div onClick={this._onUserIconClick.bind(this)} title={'Вы вошли как '+ userName} className="popup-prevent main-navigation__user-icon" />
                <div onClick={this._onUserIconClick.bind(this)} title={'Вы вошли как '+ userName} className="popup-prevent main-navigation__user-icon-down" />
                <div className="popup-prevent header__popup-window" style={{display: !showContext ? 'none' : 'block'}}>
                    <div style={{marginBottom:'3px'}}>Вы вошли как</div>
                    <strong>{userName}</strong>
                    <div style={{marginBottom:'3px', marginTop:'3px', borderTop:'1px solid #dddddd'}} />
                    <a style={{textDecoration: 'none'}} href="api/logout">Выйти из программы</a>
                </div>
            </div>
        );
    }
}

export default Header;