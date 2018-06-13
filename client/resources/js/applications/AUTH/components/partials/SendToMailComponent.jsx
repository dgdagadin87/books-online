import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {checkEmail} from '../../../../core/coreUtils';

class SendToMailComponent extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            bookId: props.bookId,
            disabled: props.disabled,
            mailValue: '',
            isHidden: true,
            isError: false
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            bookId: nextProps.bookId || '',
            isHidden: true,
            disabled: nextProps.disabled
        });
    }

    _onShowMailClick() {

        const {isHidden, disabled} = this.state;
        
        if (disabled) {
            return;
        }
        
        this.setState({
            isHidden: !isHidden
        });
    }
    
    _onCloseMailClick(event) {
        
        event.preventDefault();
        
        this.setState({
            isHidden: true
        });
    }

    _validateMail() {
        
        let {mailValue} = this.state;

        this.setState({
            isError: !checkEmail(mailValue)
        });
    }

    _handleInput(event) {

        let value = event.currentTarget.value;

        this.setState({
            mailValue: value,
            isError: false
        }, () => this._validateMail(value));
    }
    
    _sendToMail () {
        
        const {sendMail} = this.props;
        const {bookId, mailValue} = this.state;
        
        if (sendMail) {
            this.setState({
                isHidden: true
            });
            sendMail(bookId, mailValue);
        }
    }

    render() {
        
        const {isHidden, mailValue, isError, disabled} = this.state;

        return (
            <div className="main-sendmail__container">
                <div
                    className={'main-sendmail__control' + (disabled ? ' disabled' : '')}
                    onClick={(event) => this._onShowMailClick(event)}
                    title="Отправить книгу по почте"
                />
                <div
                    style={{display: isHidden ? 'none' : 'block'}}
                    className="main-sendmail__content"
                >
                    <div className="main-sendmail__title">
                        <div
                            onClick={(event) => this._onCloseMailClick(event)}
                            className="main-sendmail__close"
                            title="Закрыть окно"
                        />
                        Отправить книгу по почте
                    </div>
                    <div className="main-sendmail__main">
                        <input
                            placeholder="Е-mail"
                            type="text"
                            value={mailValue}
                            onChange={this._handleInput.bind(this)}
                            className={'main-sendmail__input' + (isError ? ' error' : '')}
                        />
                        <button
                            onClick={this._sendToMail.bind(this)}
                            disabled={isError || !mailValue}
                            className="main-sendmail__button">Отправить
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

SendToMailComponent.propTypes = {
    bookId: PropTypes.any.isRequired,
    sendMail: PropTypes.func
};

export default SendToMailComponent;