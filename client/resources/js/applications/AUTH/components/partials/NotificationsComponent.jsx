import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    toggleDisplayList,
    setNotificationsData,
    setNotificationsRead,
    clearNotifications
} from '../../actions/notifications';
import {defaultSettings, urlSettings, getNotificationsPeriod} from '../../../../config/settings';
import {createUrl} from '../../../../core/coreUtils';

const mapStateToProps = (state) => {
    return {
        notReadCount: state.notificationsData.notReadCount,
        notifications: state.notificationsData.notifications,
        displayList: state.notificationsData.displayList
    };
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        toggleDisplayList: toggleDisplayList,
        setNotificationsData: setNotificationsData,
        setNotificationsRead: setNotificationsRead,
        clearNotifications: clearNotifications
    }, dispatch);
}

class Notifications extends Component {

    constructor(props) {

        super(props);
    }

    componentDidMount() {

        const {setNotificationsData} = this.props;

        window.setInterval(() => {
            setNotificationsData();
        }, getNotificationsPeriod);
    }

    _getNotificationsIds() {

        const {notifications = []} = this.props;

        let notifyIds = [];

        for (let i = 0; i < notifications.length; i++) {

            const currentItem = notifications[i];
            notifyIds.push(currentItem['notification_id']);
        }

        return notifyIds;
    }

    _toggleDisplayList(value) {

        const {notifications, toggleDisplayList, setNotificationsRead} = this.props;
        const notifyIds = this._getNotificationsIds();

        toggleDisplayList(value);

        if (!value) {
            setNotificationsRead(notifyIds, notifications);
        }
    }

    _onBadgeClick (ev) {

        if (ev.target.classList.contains('notifications-prevent')) {
            return;
        }

        const {displayList} = this.props;

        this._toggleDisplayList(!displayList);
    }

    _onRefreshClick(ev) {

        ev.preventDefault();

        const {setNotificationsData} = this.props

        setNotificationsData();
    }

    _onCloseClick(ev) {

        ev.preventDefault();

        this._toggleDisplayList(false);
    }

    _onClearClick(ev) {

        ev.preventDefault();

        const {clearNotifications} = this.props;
        const notifyIds = this._getNotificationsIds();

        clearNotifications(notifyIds);
    }

    _renderNotifications () {

        const {notifications = []} = this.props;

        let returnArray = [];

        for (let i = 0; i < notifications.length; i++) {
            const currentItem = notifications[i];
            const {notification_id, bookId, bookName, type, status, isRead} = currentItem;

            let mainText;

            if (status === 'success') {
                mainText = 'Книга "' + bookName + '" ' + (type === 'add' ? 'добавлена' : 'сформирована');
            }
            else {
                mainText = 'Ошибка формирования книги "' + bookName + '"';
            }

            returnArray.push(
                <tr className={isRead === 'no' ? 'not-read' : ''} key={notification_id} title={isRead === 'no' ? 'новое уведомление' : ''}>
                    <td className="notifications-prevent notifications__status-cell">
                        <div className={'notifications__status ' + status} />
                    </td>
                    <td className="notifications-prevent notifications__name-cell">
                       {mainText}
                    </td>
                    <td className="notifications-prevent notifications__panel-cell">
                        {status === 'success' ?
                            <a
                                target="_blank"
                                href={createUrl(defaultSettings, urlSettings['downloadRawBook']) + bookId}
                                className="notifications-prevent notifications__download"
                            >
                                Скачать
                            </a> :
                            null
                        }
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

        const {notReadCount = 0, displayList = false} = this.props;

        const badgeTitle = !notReadCount || parseInt(notReadCount) === 0 ? 'Нет непрочитанных уведомлений' : notReadCount + ' непрочитанных уведомлений';
        const noUnreadClass = !notReadCount || parseInt(notReadCount) === 0 ? ' no-unread' : '';

        return (
            <div className={'notifications__number' + noUnreadClass} onClick={this._onBadgeClick.bind(this)}>
                <span title={badgeTitle}>{notReadCount}</span>
                <div
                    className="notifications-prevent notifications__list"
                    style={{display: displayList ? 'block' : 'none'}}
                >
                    <div className="notifications__title">Список уведомлений</div>
                    <div className="notifications-prevent" style={{textAlign:'right', marginBottom:'10px'}}>
                        <a onClick={this._onRefreshClick.bind(this)} className="notifications-prevent notifications__link" href="#">Обновить</a>
                        &nbsp;&nbsp;
                        <a onClick={this._onClearClick.bind(this)} className="notifications-prevent notifications__link" href="#">Очистить</a>
                        &nbsp;&nbsp;
                        <a onClick={this._onCloseClick.bind(this)} className="notifications-prevent notifications__link" href="#">Закрыть</a>
                    </div>
                    <div className="notifications__table-container">{this._renderNotifications()}</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);