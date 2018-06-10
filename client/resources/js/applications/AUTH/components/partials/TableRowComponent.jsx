import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {createUrl as CUL} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

import DescriptionComponent from './DescriptionComponent';
import SendToMailComponent from './SendToMailComponent';
import LinkComponent from './LinkComponent';
import AddBookComponent from './AddBookComponent';
import DeleteBookComponent from './DeleteBookComponent';

class TableRowComponent extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            itemData: props.itemData,
            disabled: props.disabled
        };
    }

    componentWillReceiveProps(nextProps) {
        
        this.setState({
            itemData: nextProps.itemData,
            disabled: nextProps.disabled
        });
    }

    _renderCell(columnData) {
        
        const {itemData} = this.state;
        const {name, type = 'usual'} = columnData;
        let columnValue;
        
        if (type === 'usual') {
            columnValue = itemData[name] || '';
            return (
                <span className="table__content-span">
                    {columnValue}
                </span>
            );
        }
        
        if (type === 'bool') {
            columnValue = itemData[name] ? true : false;
            return (
                <span className="table__content-span">
                    {columnValue ? 'Да' : 'Нет'}
                </span>
            );
        }
        
        if (type === 'description') {
            columnValue = itemData[name] || '';
            return (
                <DescriptionComponent
                    value={columnValue}
                    data={itemData}
                />
            );
        }
        
        if (type === 'link') {
            return (
                <LinkComponent
                    parentSiteUrl={itemData['parentSiteUrl'] || ''}
                    parentSiteName={itemData['parentSiteName'] || ''}
                />
            );
        }
    }

    _renderRow() {
        
        const {
            showCheckColumn,
            columns,
            routerHistory,
            controlMode,
            onSendMail,
            onDeleteBook,
            onAddBook,
            onDeleteUser
        } = this.props;
        const {disabled, itemData} = this.state;
        
        let columnsArray = [];
        
        if (showCheckColumn) {
            columnsArray.push(
                <td
                    key={-1}
                    className={'table__content-check'}
                >
                    <span className="table__check-span">
                        <input disabled={disabled} type="checkbox" className="content-checkbox" />
                    </span>
                </td>
            );
        }
        
        if (controlMode === 'users') {
            columnsArray.push(
                <td
                    key={-7}
                    className={'table__user-avatar'}
                >
                    <div title="Нет аватара" className="users__avatar" />
                </td>
            );
        }
        
        for (let i = 0; i < columns.length; i++) {

            const currentColumn = columns[i];
            const {name, type} = currentColumn;
            
            columnsArray.push(
                <td
                    key={i}
                    className={'table__content-cell content-' + name}
                >
                {this._renderCell(currentColumn)}
                </td>
            );
        }
        
        if (controlMode === 'mybooks') {
            columnsArray.push(
                <td key={columns.length} className="table__content-cell" style={{width: '26px'}}>
                    <div title="Скачать книгу" className={'main-download__control' + (disabled ? ' disabled' : '')} onClick={()=>{
                        if (disabled) {
                            return;
                        }
                        window.open(CUL(defaultSettings, urlSettings['downloadBook']) + itemData['bookId'], '_blank')
                    }} />
                </td>
            );
            columnsArray.push(
                <td key={columns.length + 1} className="table__content-cell no-border" style={{width: '26px'}}>
                    <SendToMailComponent
                        bookId={itemData['bookId']}
                        sendMail={onSendMail}
                        disabled={disabled}
                    />
                </td>
            );
            columnsArray.push(
                <td key={columns.length + 2} className="table__content-cell no-border" style={{width: '26px'}}>
                    <DeleteBookComponent
                        bookId={itemData['bookId']}
                        deleteBook={onDeleteBook}
                        disabled={disabled}
                    />
                </td>
            );
        }
        
        if (controlMode === 'allbooks') {
            const {isAdmin} = this.props;
            columnsArray.push(
                <td key={columns.length} className="table__content-cell" style={{width: '26px'}}>
                    <div title="Скачать книгу" className={'main-download__control' + (disabled ? ' disabled' : '')} onClick={()=>{
                        if (disabled) {
                            return;
                        }
                        window.open(CUL(defaultSettings, urlSettings['downloadBook']) + itemData['bookId'], '_blank')
                    }} />
                </td>
            );
            columnsArray.push(
                <td key={columns.length + 1} className="table__content-cell no-border" style={{width: '26px'}}>
                    <SendToMailComponent
                        bookId={itemData['bookId']}
                        sendMail={onSendMail}
                        disabled={disabled}
                    />
                </td>
            );
            columnsArray.push(
                <td key={columns.length + 2} className="table__content-cell no-border" style={{width: '26px'}}>
                    <AddBookComponent
                        bookId={itemData['bookId']}
                        addBook={onAddBook}
                        disabled={disabled}
                    />
                </td>
            );
            if (isAdmin) {
                columnsArray.push(
                    <td key={columns.length + 3} className="table__content-cell no-border" style={{width: '26px'}}>
                        <DeleteBookComponent
                            bookId={itemData['bookId']}
                            deleteBook={onDeleteBook}
                            disabled={disabled}
                        />
                    </td>
                );
            }
        }
        
        if (controlMode === 'users') {
            columnsArray.push(
                <td key={columns.length} className="table__content-cell" style={{width:'38px',paddingRight:'0',textAlign:'center'}}>
                    <div className={'main-edit__control' + (disabled ? ' disabled' : '')} onClick={()=>{
                        if (disabled) {
                            return;
                        }
                        routerHistory.push('/users/edituser/' + itemData['userId']);
                    }} title="Редактировать пользователя" />
                </td>
            );
            columnsArray.push(
                <td key={columns.length + 1} className="table__content-cell no-border" style={{width:'26px'}}>
                    <div className={'main-deletebook__control' + (disabled ? ' disabled' : '')} onClick={()=>{
                        if (disabled) {
                            return;
                        }
                        if (onDeleteUser) {
                            onDeleteUser(itemData['userId']);
                        }
                    }} title="Удалить пользователя" />
                </td>
            );
        }
        
        return columnsArray;
    }

    render() {

        return (
            <tr>{this._renderRow()}</tr>
        );
    }
}

TableRowComponent.propTypes = {
    controlMode: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    isAdmin: PropTypes.bool,
    routerHistory: PropTypes.any,
    columns: PropTypes.array.isRequired,
    itemData: PropTypes.object.isRequired,
    showCheckColumn: PropTypes.bool,
    onSendMail: PropTypes.func,
    onAddBook: PropTypes.func,
    onDeleteBook: PropTypes.func,
    onDeleteUser: PropTypes.func
};

export default TableRowComponent;