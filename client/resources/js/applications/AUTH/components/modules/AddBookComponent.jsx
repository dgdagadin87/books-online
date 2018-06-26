import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import {pageSettings} from '../../../../config/settings';
import {isEmpty} from '../../../../core/coreUtils';

import {createUrl} from '../../../../core/coreUtils';

import { changeTitle } from '../../actions/common';
import {
    asyncGetAddBook,
    setAddBookFormData
} from '../../actions/addBook';
import { setMyBooksSearchTerm } from '../../actions/myBooks';
import { setAllBooksSearchTerm } from '../../actions/allBooks';

import PreloaderComponent from '../partials/LargePreloaderComponent';
import SearchComponent from '../partials/SearchComponent';
import SelectSiteComponent from '../partials/SelectSiteComponent';
import PagingComponent from '../partials/PagingComponent';

const mapStateToProps = state => {
    return {
        isLoaded: state.addBookData.isLoaded,
        collection: state.addBookData.collection,
        sites: state.addBookData.sites,
        isFoundInMy: state.addBookData.isFoundInMy,
        isFoundInAll: state.addBookData.isFoundInAll,
        searchTerm: state.addBookData.searchTerm,
        selectedSiteId: state.addBookData.selectedSiteId,
        page: state.addBookData.page,
        pages: state.addBookData.pages,
        totalCount: state.addBookData.totalCount,
        disabled: state.addBookData.disabled,
        globalLoading: state.addBookData.globalLoading,
        isSelectError: state.addBookData.isSelectError,
        isSearchError: state.addBookData.isSearchError
    }
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        setTitle: changeTitle,
        asyncGetAddBook: asyncGetAddBook,
        setAddFormData: setAddBookFormData,
        setMyBooksSearchTerm: setMyBooksSearchTerm,
        setAllBooksSearchTerm: setAllBooksSearchTerm
    }, dispatch);
}

class AddBookComponent extends Component {

    constructor(props) {
        super(props);

        let {setTitle, isSelectError} = this.props;

        setTitle('Добавление книги');
    }

    componentDidMount() {

        let {isLoaded} = this.props;

        if (isLoaded === false) {
            this._loadData();
        }
    }

    _loadData(actionData = null) {

        const {asyncGetAddBook, selectedSiteId, page, searchTerm, isLoaded} = this.props;

        let queryData = {
            selectedSiteId,
            page,
            searchTerm
        };

        const dataForAction = !!actionData ? actionData : {};

        asyncGetAddBook(isLoaded, dataForAction, queryData);
    }

    _onSiteChange(siteId) {

        const {setAddFormData} = this.props;

        setAddFormData({
            isSelectError: parseInt(siteId) === -1,
            selectedSiteId: siteId
        });
    }

    _onPageChange(pageData) {

        this._loadData(pageData);
    }

    _onSiteSearch(searchData) {

        const {selectedSiteId, setAddFormData} = this.props;
        let {searchTerm} = searchData;
        let stateObject = {};
        let error = false;

        stateObject['searchTerm'] = searchTerm;

        if (isEmpty(searchTerm)) {
            error = true;
            stateObject['isSearchError'] = true;
        }

        if (parseInt(selectedSiteId) === -1) {
            error = true;
            stateObject['isSelectError'] = true;
        }

        if (error) {
            setAddFormData(stateObject);
        }
        else {
            stateObject.isSelectError = false;
            stateObject.isSearchError = false;
            this._loadData(stateObject);
        }
    }

    _renderSearchPanel() {

        const {sites = [], searchTerm, disabled, selectedSiteId, isSelectError, isSearchError} = this.props;

        return(
            <div key={0} className="main-addbook__search-panel">
                <div className="main-addbook__search-panel-title">
                    Поиск по книгам
                </div>
                <div className="main-addbook__search-panel-content">
                    <div>
                        <div className="main-addbook__search-panel-label">
                            <SelectSiteComponent
                                disabled={disabled}
                                items={sites}
                                isError={isSelectError}
                                selectedSiteId={selectedSiteId}
                                onChange={this._onSiteChange.bind(this)}
                            />
                        </div>
                        <div className="main-addbook__search-panel-input">
                            <SearchComponent
                                key={0}
                                searchTerm={searchTerm}
                                onSearch={this._onSiteSearch.bind(this)}
                                disabled={disabled}
                                mode="strict"
                                isError={isSearchError}
                            />
                        </div>
                        <div className="clear-both" />
                    </div>
                </div>
            </div>
        );
    }

    _renderPreloader() {

        const {globalLoading, disabled} = this.props;

        if (!globalLoading && disabled) {
            return (
                <div  key={1} className="main-addnewbook__preloader">
                    Подождите...
                </div>
            );
        }
        else {
            return null;
        }
    }

    _renderFoundInThis() {

        const {history, setMyBooksSearchTerm, setAllBooksSearchTerm} = this.props;
        const {isFoundInMy, isFoundInAll, searchTerm, disabled} = this.props;

        if (disabled) {
            return null;
        }

        if (isFoundInMy || isFoundInAll) {

            let foundInMy = null, foundInAll = null;

            if (isFoundInMy) {
                const linkToMyBooks = (
                    <a
                        href='#'
                        onClick={(event) => {
                            event.preventDefault();
                            setMyBooksSearchTerm(searchTerm);
                            history.push('/');
                        }}
                    >
                        Мои книги
                    </a>
                );
                foundInMy = (
                    <div className="main-addnewbook__foundin-item">
                        Результаты, содержащие введенную фразу для поиска (<strong>{searchTerm}</strong>), найдены в разделе {linkToMyBooks}
                    </div>
                );
            }

            if (isFoundInAll) {
                const linkToAllBooks = (
                    <a
                        href='#'
                        onClick={(event) => {
                            event.preventDefault();
                            setAllBooksSearchTerm(searchTerm);
                            history.push('/allbooks');
                        }}
                    >
                        Все книги
                    </a>
                );
                foundInAll = (
                    <div className="main-addnewbook__foundin-item">
                        Результаты, содержащие введенную фразу для поиска (<strong>{searchTerm}</strong>), найдены в разделе {linkToAllBooks}
                    </div>
                );
            }

            return (
                <div  key={2} className="main-addnewbook__foundin-panel">
                    <div className="main-addnewbook__foundin-title">
                        Найденные результаты
                    </div>
                    {foundInMy}
                    {foundInAll}
                </div>
            );
        }
        else {
            return null;
        }
    }

    _renderTable() {

        const {globalEvents} = this.props;
        const {collection} = this.props;

        let rowsArray = [];

        for (let i = 0; i < collection.length; i++) {
            let currentItem = collection[i];

            let author = currentItem['author'];
            let correctAuthor = author;
            if (correctAuthor.length > 50) {
                correctAuthor = correctAuthor.substr(0, 47) + '...'
            }

            rowsArray.push(
                <tr key={i}>
                    <td className="item addnewbook-bookname-cell">
                        {currentItem['name']}
                    </td>
                    <td className="item addnewbook-authorname-cell">
                        <span title={author}>{correctAuthor}</span>
                    </td>
                    <td className="item addnewbook-authorname-cell">
                        {currentItem['genre']}
                    </td>
                    <td className="item addnewbook-panel-cell" style={{width:'75px'}}>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                globalEvents.trigger('downloadRawBook', 'start', false);

                                let queryData = {
                                    bookLink: currentItem['link'],
                                    bookAuthor: author,
                                    bookGenre: currentItem['genre'],
                                    bookName: currentItem['name']
                                };

                                ajaxQuery(
                                    {
                                        url: createUrl(defaultSettings, urlSettings['getRawBook']),
                                        data: queryData,
                                        method: 'POST'
                                    },
                                    {
                                        afterSuccess: (result) => {
                                            if (!result.isSuccess) {
                                                globalEvents.trigger('showError', result);
                                                globalEvents.trigger('downloadRawBook', 'error');
                                                return;
                                            }
                                            let {data} = result;
                                            globalEvents.trigger('downloadRawBook', 'end', data.bookId);
                                        },
                                        afterError: (result) => {
                                            globalEvents.trigger('showError', result);
                                        }
                                    }
                                );
                            }}
                        >
                            Скачать
                        </a>
                    </td>
                    <td className="item addnewbook-panel-cell" style={{width:'75px'}}>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                globalEvents.trigger('addInMyBooks', 'start');

                                let queryData = {
                                    bookLink: currentItem['link'],
                                    bookAuthor: author,
                                    bookGenre: currentItem['genre'],
                                    bookName: currentItem['name']
                                };

                                ajaxQuery(
                                    {
                                        url: createUrl(defaultSettings, urlSettings['addRawBook']),
                                        data: queryData,
                                        method: 'POST'
                                    },
                                    {
                                        afterSuccess: (result) => {
                                            if (!result.isSuccess) {
                                                globalEvents.trigger('showError', result);
                                                globalEvents.trigger('addInMyBooks', 'error');
                                                return;
                                            }
                                            let defaultMyBooksData = getDefaultState('mybooks');
                                            globalEvents.trigger('setModuleData', defaultMyBooksData, 'mybooks');
                                            globalEvents.trigger('addInMyBooks', 'end');
                                        },
                                        afterError: (result) => {
                                            globalEvents.trigger('showError', result);
                                        }
                                    }
                                );
                            }}
                        >
                            Добавить
                        </a>
                    </td>
                    <td className="item addnewbook-panel-cell" style={{width:'75px',borderRightWidth:'0'}}>
                        <a
                            href={currentItem['link']}
                            target="_blank"
                        >
                            Перейти
                        </a>
                    </td>
                </tr>
            );
        }

        return (
            <div className="main-addnewbook__table-container">
                <div className="main-addnewbook__table-head">
                    Результаты, найденные на выбранном сайте
                </div>
                <div className="main-addnewbook__table-scroll-container">
                    <table cellSpacing="0" cellPadding="0" className="main-addnewbook__table">
                        <thead />
                        <tbody>
                        <tr>
                            <td className="header addnewbook-bookname-head">Название</td>
                            <td className="header addnewbook-authorname-head">Автор</td>
                            <td className="header addnewbook-genre-head">Жанр</td>
                            <td className="header addnewbook-panel-head" colSpan="3">&nbsp;</td>
                        </tr>
                        {rowsArray.length > 0 ? rowsArray : <tr><td style={{borderRadius:'0px',borderLeft:'0',borderRight:'0'}} className="item" colSpan="6">Результатов, удовлятворяющих критериям поиска, не найдено</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    _renderCollection() {

        const {collection, disabled} = this.props;

        if (disabled) {
            return null;
        }

        if (collection === false) {
            return null;
        }

        if (Array.isArray(collection)) {
            return (
                <div key={3} className="main-addnewbook__collection-container">
                    {this._renderTable()}
                </div>
            );
        }

        return null;
    }

    _renderPaging() {

        const {page, pages, disabled, collection} = this.props;

        if (collection === false) {
            return null;
        }

        if (disabled) {
            return null;
        }

        return (
            <PagingComponent
                key={7}
                pageSettings={pageSettings}
                page={page}
                pages={pages}
                disabled={disabled}
                onChange={this._onPageChange.bind(this)}
                onRefresh={this._loadData.bind(this)}
            />
        );
    }

    _renderAddBook() {

        let addBookUI = [];

        addBookUI.push(this._renderSearchPanel());

        addBookUI.push(this._renderPreloader());

        addBookUI.push(this._renderFoundInThis());

        addBookUI.push(this._renderCollection());

        addBookUI.push(this._renderPaging());

        return addBookUI;
    }

    render() {

        const {globalLoading, sites} = this.props;

        return (
            <div className="main-addnewbook__container">
                {globalLoading || sites === false ? <PreloaderComponent /> : this._renderAddBook()}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookComponent);