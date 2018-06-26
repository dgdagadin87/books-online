import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {changeTitle} from '../../actions/common';
import {defaultSettings, urlSettings} from "../../../../config/settings";
import {createUrl as CUL} from "../../../../core/coreUtils";

const mapStateToProps = (state) => {
    return {
        notReadCount: state.notificationsData.notReadCount,
        notifications: state.notificationsData.notifications
    };
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        changeTitle: changeTitle
    }, dispatch);
}

class Notifications extends Component {

    constructor(props) {

        super(props);

        this.state = {
            displayList: false
        };
    }

    _onBadgeClick (ev) {

        if (ev.target.classList.contains('notifications-prevent')) {
            return;
        }

        const {displayList} = this.state;

        this.setState({
            displayList: !displayList
        });
    }

    _onCloseClick(ev) {

        ev.preventDefault();

        this.setState({
            displayList: false
        });
    }

    _onClearClick(ev) {

        ev.preventDefault();
    }

    _renderNotifications () {

        const {notifications = []} = this.props;

        let returnArray = [];

        for (let i = 0; i < notifications.length; i++) {
            const currentItem = notifications[i];
            const {id, bookId, bookName, type, status} = currentItem;

            let mainText;

            if (status === 'success') {
                mainText = 'Книга "' + bookName + '" ' + (type === 'add' ? 'добавлена' : 'сформирована');
            }
            else {
                mainText = 'Ошибка формирования книги "' + bookName + '"';
            }

            returnArray.push(
                <tr key={id}>
                    <td className="notifications-prevent notifications__status-cell">
                        <div className={'notifications__status ' + status} />
                    </td>
                    <td className="notifications-prevent notifications__name-cell">
                       {mainText}
                    </td>
                    <td className="notifications-prevent notifications__panel-cell">
                        <a
                            target="_blank"
                            href={CUL(defaultSettings, urlSettings['downloadBook']) + bookId}
                            className="notifications-prevent notifications__download"
                        >
                            Скачать
                        </a>
                    </td>
                </tr>
            );
        }

        if (returnArray.length > 0) {
            return (
                <table className="notifications-prevent notifications__table" cellPadding="0" cellSpacing="0">
                    <tbody>{returnArray}</tbody>
                </table>
            );
        }
        else {
            return (<div className="notifications__nodata">Нет уведомлений</div>)
        }
    }

    render() {

        const {notReadCount = 0} = this.props;
        const {displayList = false} = this.state;

        return (
            <div className="notifications__number" onClick={this._onBadgeClick.bind(this)}>
                {notReadCount}
                <div
                    className="notifications-prevent notifications__list"
                    style={{display: displayList ? 'block' : 'none'}}
                >
                    <div className="notifications-prevent" style={{textAlign:'right', marginBottom:'10px'}}>
                        <a onClick={this._onClearClick.bind(this)} className="notifications-prevent notifications__link" href="#">Очистить</a>
                        &nbsp;
                        <a onClick={this._onCloseClick.bind(this)} className="notifications-prevent notifications__link" href="#">Закрыть</a>
                    </div>
                    <div className="notifications__table-container">{this._renderNotifications()}</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);