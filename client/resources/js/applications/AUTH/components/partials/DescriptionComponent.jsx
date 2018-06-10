import React, {Component} from 'react';

import PropTypes from 'prop-types';

class DescriptionComponent extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: props.value,
            data: props.data,
            isHidden: true
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            value: nextProps.value || '',
            data: nextProps.data || {},
            isHidden: true
        });
    }

    _onShowDescriptionClick(event) {
        
        event.preventDefault();
        
        const {isHidden} = this.state;
        
        this.setState({
            isHidden: !isHidden
        });
    }
    
    _onCloseDescriptionClick(event) {
        
        event.preventDefault();
        
        this.setState({
            isHidden: true
        });
    }

    render() {
        
        const {data, isHidden} = this.state;

        return (
            <div className="main-description__container">
                <a
                    onClick={(event) => this._onShowDescriptionClick(event)}
                    className="main-description__control"
                    href="#"
                    title="Смотреть краткое описание"
                >
                    {data.bookName}
                </a>
                <div
                    title="Закрыть описание"
                    onClick={(event) => this._onCloseDescriptionClick(event)}
                    style={{display: isHidden ? 'none' : 'block'}}
                    className="main-description__content"
                >
                    <div><strong>Описание</strong></div>
                    {data.bookShortDesc}
                </div>
            </div>
        );
    }
}

DescriptionComponent.propTypes = {
    value: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
};

export default DescriptionComponent;