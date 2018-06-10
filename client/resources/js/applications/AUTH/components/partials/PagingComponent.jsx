import React, {Component} from 'react';
import $ from 'jquery';

import PropTypes from 'prop-types';

import {pageSettings as currentSettings} from '../../config/settings';

class PagingComponent extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            page: props.page || 1,
            pages: props.pages || 1,
            disabled: props.disabled,
            isError: false,
            pageValue: props.page || 1,
            isWindowHidden: true
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            page: nextProps.page || 1,
            pages: nextProps.pages || 1,
            disabled: nextProps.disabled,
            isError: false,
            pageValue: nextProps.page || 1,
            isWindowHidden: true
        });
    }
    
    componentDidMount() {

        document.addEventListener('click', this._handlerHidePopup.bind(this));
    }

    componentWillUnmount() {

        document.removeEventListener('click', this._handlerHidePopup.bind(this));
    }
    
    _handlerHidePopup(ev) {

        if ($(ev.target).hasClass('paging-prevent')) {
            return;
        }

        let {isWindowHidden} = this.state;
        
        if (isWindowHidden) {
            return;
        }
        
        this.setState({
            isWindowHidden: true
        });
    }

    _onRefresh() {

        const {onRefresh} = this.props;
        const {disabled} = this.state;
        
        if (disabled) {
            return;
        }
        
        if (onRefresh) {
            onRefresh();
        }
    }
    
    _onToPage() {

        const {isWindowHidden, disabled} = this.state;

        if (disabled) {
            return;
        }
        
        this.setState({
            isWindowHidden: !isWindowHidden
        });
    }

    _onPageClick(pageNumber, event) {
        
        event.preventDefault();

        const {onChange} = this.props;
        const {disabled} = this.state;
        
        if (disabled) {
            return;
        }
        
        if (onChange) {
            onChange({
                page: pageNumber
            });
        }
    }

    _validatePage() {
        
        let {pageValue, pages} = this.state;
        
        let isPageError = !pageValue || !Number(pageValue) || (pageValue < 1) || (pageValue > pages);
        
        this.setState({
            isError: isPageError
        });
    }

    _handleInput(event) {

        let value = event.target.value;

        this.setState({
            pageValue: value,
            isError: false
        }, () => this._validatePage(value));
    }

    _goToPage() {
        
        const {onChange} = this.props;
        const {disabled, page, pageValue} = this.state;
        
        if (disabled) {
            return;
        }

        this.setState({
            isWindowHidden: true
        });
        
        if (onChange && page !== pageValue) {
            onChange({
                page: +pageValue
            });
        }
    }

    _handleKeyPress(event) {
        
        if (event.key === 'Enter') {
            event.preventDefault();
            
            const {disabled, isError} = this.state;
            
            if (disabled || isError) {
                return;
            }
            
            this._goToPage();
        }
    }

    _renderPage(pageNumber, keyNumber) {
        
        const {disabled} = this.state;
        
        return (
            <a
                title={'Перейти на страницу ' + pageNumber}
                key={keyNumber}
                href="#"
                className={'main-paging__page' + ( disabled ? ' disabled' : '' )}
                onClick={this._onPageClick.bind(this, pageNumber)}
            >
                {pageNumber}
            </a>
        );
    }

    _renderNumbers() {

        let {pageSettings} = this.props;
        const {page, pages, disabled} = this.state;

        if (!page)  {
            pageSettings = currentSettings;
        }
        
        const {start, end, left, right} = pageSettings;

        let keyNumber = 0;
        let numbersElement = [];
        
        let leftRest = page - 1;
        let restCurrentNum = pages - page;
        let nextCurPage = page + 1;
        
        // left part
        if (leftRest >= 1 && leftRest < (start + left + 1)) {
            for (let i = 1; i < page; i++) {
                keyNumber++;
                numbersElement.push(this._renderPage(i, keyNumber));
            }
        }
        else if (leftRest >= (start + left + 1)) {
            for (let c = 1; c <= start; c++) {
                keyNumber++;
                numbersElement.push(this._renderPage(c, keyNumber));
            }
            numbersElement.push(
                <span className={'main-paging__dotted'} key={-1}>...</span>
            );
            for (let d = (page - left);  d < page; d++) {
                keyNumber++;
                numbersElement.push(this._renderPage(d, keyNumber));
            }
        }
        
        // current page
        keyNumber++;
        numbersElement.push(
            <span className={'main-paging__current-page'} key={-3}>
                {page}
            </span>
        );

        // right part
        if (restCurrentNum >= 1 && restCurrentNum < (end + right + 1)) {
            for (let j = nextCurPage; j <= pages; j++) {
                keyNumber++;
                numbersElement.push(this._renderPage(j, keyNumber));
            }
        }
        else if (restCurrentNum >= (end + right + 1)) {
            for (let n = nextCurPage;  n <= (page + right); n++) {
                keyNumber++;
                numbersElement.push(this._renderPage(n, keyNumber));
            }
            numbersElement.push(
                <span className={'main-paging__dotted'} key={-2}>...</span>
            );

            for (let m = (pages - end + 1); m <= pages; m++) {
                keyNumber++;
                numbersElement.push(this._renderPage(m, keyNumber));
            }
        }

        return numbersElement;
    }

    _renderPrevPage() {
        
        const {page, disabled} = this.state;
        
        
        if (page > 1) {
            
            let prevPage = page - 1;
            return (
                <a
                    title="Перейти на предыдущую страницу"
                    key={-7}
                    href="#"
                    className={'main-paging__page' + ( disabled ? ' disabled' : '' )}
                    onClick={this._onPageClick.bind(this, prevPage)}
                >
                    {'<'}
                </a>
            );
        }
        
        return (null);
    }
    
    _renderNextPage() {
        
        const {page, pages, disabled} = this.state;
        
        if (page < pages) {
            
            let nextPage = page + 1;
            return (
                <a
                    title="Перейти на следующую страницу"
                    key={-8}
                    href="#"
                    className={'main-paging__page' + ( disabled ? ' disabled' : '' )}
                    onClick={this._onPageClick.bind(this, nextPage)}
                >
                    {'>'}
                </a>
            );
        }
        
        return (null);
    }

    render() {
        
        const {disabled, isError, pageValue, isWindowHidden} = this.state;

        return (
            <div className="main-paging__container">
                <div className="main-paging__left">
                    {this._renderPrevPage()}
                    {this._renderNumbers()}
                    {this._renderNextPage()}
                    <span style={{fontSize:'16px',paddingLeft:'10px'}}>страницы</span>
                </div>
                <div className="main-paging__right">
                    <div
                        className={'main-paging__refresh' + ( disabled ? ' disabled' : '' )}
                        onClick={this._onRefresh.bind(this)}
                        title="Обновить"
                    >
                        Обновить
                    </div>
                    <div
                        className={'paging-prevent main-paging__to-page' + ( disabled ? ' disabled' : '' )}
                        onClick={this._onToPage.bind(this)}
                        title="Перейти на страницу"
                    >
                        Перейти
                    </div>
                    <div className="main-paging__to-page-window paging-prevent" style={{display: isWindowHidden ? 'none' : 'block'}}>
                        <div className="main-paging__to-page-title paging-prevent">На страницу</div>
                        <div className="main-paging__to-page-form paging-prevent">
                            <input
                                type="text"
                                value={pageValue}
                                onChange={this._handleInput.bind(this)}
                                onKeyPress={this._handleKeyPress.bind(this)}
                                className={'paging-prevent main-paging__to-paging-input' + (isError ? ' error' : '')}
                            />
                            <button
                                onClick={this._goToPage.bind(this)}
                                disabled={isError || !pageValue}
                                className="paging-prevent main-paging__to-page-button"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
                <div className="clear-both" />
            </div>
        );
    }
}

PagingComponent.propTypes = {
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    pageSettings: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired
};

export default PagingComponent;