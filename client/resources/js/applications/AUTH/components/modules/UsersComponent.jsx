import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {changeTitle} from '../../actions/common';
import {
    asyncGetUsers,
    asyncDeleteUser
} from '../../actions/users';

import {pageSettings} from '../../../../config/settings';

import NoAccessModule from '../partials/NoAccessComponent';
import PreloaderComponent from '../partials/LargePreloaderComponent';
import TableComponent from '../partials/TableComponent';
import PagingComponent from '../partials/PagingComponent';

const mapStateToProps = (state) => {
    return {
        userData: state.commonData.userData,
        collection: state.usersData.collection,
        sortField: state.usersData.sortField,
        sortType: state.usersData.sortType,
        page: state.usersData.page,
        pages: state.usersData.pages,
        totalCount: state.usersData.totalCount,
        disabled: state.usersData.disabled,
        globalLoading: state.usersData.globalLoading
    };
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        setTitle: changeTitle,
        asyncLoadUsers: asyncGetUsers,
        asyncDeleteUser: asyncDeleteUser
    }, dispatch);
}

class UsersComponent extends Component {

    constructor(props) {
        super(props);

        let {setTitle, collection, globalLoading, disabled} = this.props;

        setTitle('Пользователи');

        if (collection === false && (!globalLoading && !disabled)) {
            this._loadData();
        }
    }

    componentWillReceiveProps() {}

    _loadData(actionData = null) {

        const {collection, sortField, sortType, page} = this.props;
        const {asyncLoadUsers} = this.props;

        const dataForAction = !!actionData ? actionData : {};

        let queryData = {
            sortField,
            sortType,
            page
        };

        asyncLoadUsers(collection, dataForAction, queryData);
    }

    _onSortChange(sortData) {

        this._loadData(sortData);
    }

    _onPageChange(pageData) {

        this._loadData(pageData);
    }

    _onDeleteUser(userId) {

        if (!confirm('Вы действительно хотите удалить выбранного пользователя?\nПользователь и его книги будут удалены безвозвратно!')) {
            return;
        }

        const {asyncDeleteUser} = this.props;

        asyncDeleteUser(userId, this._loadData.bind(this));
    }

    _renderUsers() {

        const {history} = this.props;

        const {
            disabled,
            collection = [],
            sortField,
            sortType,
            page,
            pages,
            totalCount,
            globalLoading
        } = this.props;

        let usersArray = [];

        usersArray.push(<div key={0} style={{marginTop:'20px'}} />);

        usersArray.push(
            <TableComponent
                key={1}
                routerHistory={history}
                items={!collection ? [] : collection}
                showCheckColumn={false}
                totalCount={totalCount}
                controlMode="users"
                onSortChange={this._onSortChange.bind(this)}
                onDeleteUser={this._onDeleteUser.bind(this)}
                sortField={sortField}
                sortType={sortType}
                disabled={disabled}
                columns={[
                    {
                        name: 'userName',
                        title: 'Имя пользователя',
                        sortable: true,
                        type: 'usual'
                    },
                    {
                        name: 'userLogin',
                        title: 'Логин для входа',
                        sortable: true,
                        type: 'usual'
                    },
                    {
                        name: 'userIsAdmin',
                        title: 'Администратор',
                        sortable: false,
                        type: 'bool'
                    }
                ]}
            />
        );

        usersArray.push(
            <PagingComponent
                key={2}
                pageSettings={pageSettings}
                page={page || 1}
                pages={pages || 1}
                disabled={disabled}
                onChange={this._onPageChange.bind(this)}
                onRefresh={this._loadData.bind(this)}
            />
        );

        return (<div>{globalLoading ? <PreloaderComponent /> : usersArray}</div>);
    }

    _renderNoAccess() {

        return (<NoAccessModule />);
    }

    render() {

        const {userData} = this.props;
        const {user = {}} = userData;
        const {userIsAdmin = false} = user;

        return (<div>{userIsAdmin ? this._renderUsers() : this._renderNoAccess()}</div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);