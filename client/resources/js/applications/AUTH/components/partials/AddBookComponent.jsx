import React, {Component} from 'react';

import PropTypes from 'prop-types';

class AddComponent extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            bookId: props.bookId,
            disabled: props.disabled
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            bookId: nextProps.bookId || '',
            disabled: nextProps.disabled
        });
    }
    
    _addBook (event) {
        
        event.preventDefault();
        
        const {addBook} = this.props;
        const {bookId, disabled} = this.state;
        
        if (disabled) {
            return;
        }

        if (addBook) {
            addBook(bookId);
        }
    }

    render() {
        
        const {disabled} = this.state;

        return (
            <div className="main-addbook__container">
                <div
                    className={'main-addbook__control' + (disabled ? ' disabled' : '')}
                    onClick={(event)=>this._addBook(event)}
                    title={'Добавить в "Мои книги"'}
                />
            </div>
        );
    }
}

AddComponent.propTypes = {
    bookId: PropTypes.any.isRequired,
    disabled: PropTypes.bool.isRequired,
    addBook: PropTypes.func
};

export default AddComponent;