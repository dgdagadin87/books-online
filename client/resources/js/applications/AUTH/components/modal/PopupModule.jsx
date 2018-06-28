import React, {Component} from 'react';
import {connect} from 'react-redux';

import ModalComponent from '../../../../ui/components/ModalComponent';
import {bindActionCreators} from 'redux';

import {showAddBookPopup} from '../../actions/addBook';

const mapStateToProps = (state) => {
    return {
        showPopup: state.addBookData.showPopup,
        bookId: state.addBookData.bookId,
        mode: state.addBookData.mode
    };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        showAddBookPopup: showAddBookPopup
    }, dispatch);
}

class AddBookPopup extends Component {

    _closeHandler() {

        const {showAddBookPopup} = this.props;

        showAddBookPopup({
            showPopup: false
        });
    }

    _downloadHandler() {

        const {bookId} = this.props;

        window.location.href = '/api/downloadrawbook/' + bookId;
    }

    _renderContent() {

        const {bookId, mode} = this.props;

        const textContent = bookId ? 'Файл книги сформирован для скачивания.' : 'Начато формирование файла книги. По мере готовности Вам придет уведомление.';

        if (mode === 'download') {
            return (
                <div className="main-addnewbook__modal-end">
                    <div style={{paddingBottom:'25px'}}>{textContent}</div>
                    {bookId ? <button onClick={this._downloadHandler.bind(this)} className="button">Скачать книгу</button> : null}
                    <button className="button button-last" onClick={this._closeHandler.bind(this)}>Закрыть окно</button>
                </div>
            );
        }
    }

    render () {

        const {showPopup = false} = this.props;

        if (!showPopup) {
            return null;
        }

        return (
            <ModalComponent>
                <div style={{display:'table-cell', verticalAlign:'middle'}}>
                    <div style={{background: '#ffffff', width:'250px', margin:'auto'}}>
                        <div className="main-addnewbook__modal-container">{this._renderContent()}</div>
                    </div>
                </div>
            </ModalComponent>
        );
    }

}

export default connect(mapStateToProps, matchDispatchToProps)(AddBookPopup);