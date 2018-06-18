import React, {Component} from 'react';

import $ from 'jquery';

import PropTypes from 'prop-types';

class SelectSiteComponent extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            disabled: props.disabled,
            selectedSiteId: props.selectedSiteId,
            isError:  props.isError
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            disabled: nextProps.disabled,
            selectedSiteId: nextProps.selectedSiteId,
            isError:  nextProps.isError
        });
    }
    
    _changeSite (event) {
        
        const {onChange} = this.props;
        
        let currentTarget = $(event.currentTarget);
        let value = currentTarget.val() || -1;
        
        if (onChange) {
            onChange(value);
        }
    }

    _renderOptions() {

        let {items} = this.props;
        
        if (items === false) {
            items = [];
        }
        
        let optionArray = [];
        
        optionArray.push(<option key={0} value={-1}>Выберите сайт для поиска</option>);
        
        for (let i = 1; i <= items.length; i++) {
            let currentItem = items[i-1];
            optionArray.push(
                <option
                    key={i}
                    value={currentItem['id']}
                >
                    {currentItem['name']}
                </option>
            );
        }
        
        return optionArray;
    }

    render() {
        
        const {disabled, selectedSiteId, isError} = this.state;

        return (
            <div className="main-selectsite__container">
                <select
                    disabled={disabled}
                    defaultValue={selectedSiteId}
                    className={'main-selectsite__select' + (isError ? ' error' : '')}
                    onChange={this._changeSite.bind(this)}
                >
                {this._renderOptions()}
                </select>
            </div>
        );
    }
}

SelectSiteComponent.propTypes = {
    items: PropTypes.any.isRequired,
    disabled: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    selectedSiteId: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SelectSiteComponent;