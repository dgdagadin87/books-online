import React, {Component} from 'react';

import PropTypes from 'prop-types';

class SearchComponent extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            searchTerm: props.searchTerm || '',
            disabled: props.disabled,
            isError: props.isError || false
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            searchTerm: nextProps.searchTerm || '',
            disabled: nextProps.disabled,
            isError: nextProps.isError || false
        });
    }

    _handleInput(event) {

        let value = event.currentTarget.value;

        this.setState({
            searchTerm: value
        });
    }

    _handleKeyPress(event) {
        
        if (event.key === 'Enter') {
            event.preventDefault();
            
            const {onSearch} = this.props;
            const {disabled, searchTerm} = this.state;
            
            if (disabled) {
                return;
            }
            
            if (onSearch) {
                onSearch({
                    searchTerm
                });
            }
        }
    }
    
    _handleClick() {
        
        const {onSearch} = this.props;
        const {disabled, searchTerm} = this.state;

        if (disabled) {
            return;
        }

        if (onSearch) {
            onSearch({
                searchTerm
            });
        }
    }

    render() {
        
        const {mode} = this.props;
        const {disabled, searchTerm, isError} = this.state;

        return (
            <div className={'main-search__container' + (mode === 'strict' ? ' short' : '')} style={{margin:'auto'}}>
                <div className="main-search__text-field-container">
                    <input
                        type="text"
                        placeholder="Введите строку поиска..."
                        disabled={disabled}
                        value={searchTerm}
                        onChange={this._handleInput.bind(this)}
                        onKeyPress={this._handleKeyPress.bind(this)}
                        className={'main-search__text-field' + (mode === 'strict' ? ' short' : '') + ( (mode === 'strict' && isError) ? ' error' : '')}
                    />
                    <button
                        className={'main-search__button' + (mode === 'strict' ? ' short' : '') + ( (mode === 'strict' && isError) ? ' error' : '')}
                        disabled={disabled}
                        onClick={this._handleClick.bind(this)}
                    >
                        Искать
                    </button>
                </div>
            </div>
        );
    }
}

SearchComponent.propTypes = {
    searchTerm: PropTypes.any,
    disabled: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    isError: PropTypes.bool
};

export default SearchComponent;