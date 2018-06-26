import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {toggleDisplayList} from '../../actions/notifications';
import {defaultSettings, urlSettings} from '../../../../config/settings';
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
        toggleDisplayList: toggleDisplayList
    }, dispatch);
}

class Notifications extends Component {

    constructor(props) {

        super(props);
    }

    _onBadgeClick (ev) {

        if (ev.target.classList.contains('notifications-prevent')) {
            return;
        }

        const {toggleDisplayList, displayList} = this.props;

        toggleDisplayList(!displayList);
    }

    _onCloseClick(ev) {

        ev.preventDefault();

        const {toggleDisplayList} = this.props;

        toggleDisplayList(false);
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
                            href={createUrl(defaultSettings, urlSettings['downloadBook']) + bookId}
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