import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import {pageSettings} from '../../../../config/settings';

import { changeTitle } from '../../actions/common';
import { asyncSendMyBookToMail } from '../../actions/myBooks';
import {
    asyncGetAllBooks, asyncDeleteBook } from '../../actions/allBooks';

import PreloaderComponent from '../partials/LargePreloaderComponent';
import SearchComponent from '../partials/SearchComponent';
import TableComponent from '../partials/TableComponent';
import PagingComponent from '../partials/PagingComponent';

const mapStateToProps = state => {
    return {
        userData: state.commonData.userData,
        collection: state.allBooksData.collection,
        sortField: state.allBooksData.sortField,
        sortType: state.allBooksData.sortType,
        searchTerm: state.allBooksData.searchTerm,
        page: state.allBooksData.page,
        pages: state.allBooksData.pages,
        totalCount: state.allBooksData.totalCount,
        disabled: state.allBooksData.disabled,
        globalLoading: state.allBooksData.globalLoading
    }
};

function matchDispatchToProps(dispatch) {

    return bindActionCreators({
        setTitle: changeTitle,
        asyncLoadBooks: asyncGetAllBooks,
        asyncSendBookToMail: asyncSendMyBookToMail,
        asyncDeleteBook: asyncDeleteBook
    }, dispatch);
}

class AllBooks extends Component {

    componentDidMount() {

        let {setTitle, collection, globalLoading, disabled} = this.props;

        setTitle('Все книги');

        if (collection === false && (!globalLoading && !disabled)) {
            this._loadData();
        }
    }

    _loadData(actionData = null) {

        const {collection, sortField, sortType, page, searchTerm} = this.props;
        const {asyncLoadBooks} = this.props;

        const dataForAction = !!actionData ? actionData : {};

        let queryData = {
            sortField,
            sortType,
            page,
            searchTerm
        };

        asyncLoadBooks(collection, dataForAction, queryData);
    }

    _onSortChange(sortData) {

        this._loadData(sortData);
    }

    _onPageChange(pageData) {

        this._loadData(pageData);
    }

    _onSearch(searchData) {

        this._loadData(searchData);
    }

    _onSendMail(bookId, emailToSend) {

        const {asyncSendBookToMail} = this.props;

        asyncSendBookToMail(bookId, emailToSend);
    }

    _onDeleteBook(bookId) {

        if (!confirm('Вы действительно хотите удалить книгу из раздела "Все книги"?\nКнига будет удалена безвозвратно и ее нельзя будет скачать.')) {
            return;
        }

        const {asyncDeleteBook} = this.props;

        asyncDeleteBook(bookId, this._loadData.bind(this));
    }

    _renderAllBooks() {

        const {history, userData} = this.props;
        const {user = {}} = userData;
        const {userIsAdmin = false} = user;

        const {
            disabled,
            collection = [],
            sortField,
            sortType,
            page,
            pages,
            totalCount,
            searchTerm
        } = this.props;

        let allBooksUI = [];

        allBooksUI.push(
            <SearchComponent
                key={0}
                searchTerm={searchTerm}
                onSearch={this._onSearch.bind(this)}
                disabled={disabled}
                mode="simple"
            />
        );

        allBooksUI.push(
            <TableComponent
                key={1}
                routerHistory={history}
                isAdmin={userIsAdmin}
                items={!collection ? [] : collection}
                showCheckColumn={true}
                totalCount={totalCount}
                controlMode="allbooks"
                onSortChange={this._onSortChange.bind(this)}
                onSendMail={this._onSendMail.bind(this)}
                onDeleteBook={this._onDeleteBook.bind(this)}
                sortField={sortField}
                sortType={sortType}
                disabled={disabled}
                columns={[
                    {
                        name: 'bookName',
                        title: 'Название',
                        sortable: true,
                        type: 'description'
                    },
                    {
                        name: 'bookAuthor',
                        title: 'Автор',
                        sortable: true,
                        type: 'usual'
                    },
                    {
                        name: 'bookGenre',
                        title: 'Жанр',
                        sortable: false,
                        type: 'usual'
                    },
                    {
                        name: 'bookSize',
                        title: 'Размер',
                        sortable: true,
                        type: 'usual'
                    },
                    {
                        name: 'bookParentSite',
                        title: 'С сайта',
                        sortable: true,
                        type: 'link'
                    }
                ]}
            />
        );

        allBooksUI.push(
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

        return allBooksUI;
    }

    render () {

        const {globalLoading} = this.props;

        return (
            <div>
                {globalLoading ? <PreloaderComponent /> : this._renderAllBooks()}
            </div>
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(AllBooks);