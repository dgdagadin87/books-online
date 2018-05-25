import React, {Component} from 'react';

import PropTypes from 'prop-types';

class TitleComponent extends Component {

    constructor(props) {
        super(props);
        
        const {title = ''} = props;
        
        this.state = {
            title: title
        };
    }

    componentWillReceiveProps(props) {
        
        const {title} = props;
        
        this.setState({
            title: title
        });
    }

    render() {

        const {title = 'Просто раздел'} = this.state;

        return (
            <div className="main-title">
                Раздел {'"' + title + '"'}
            </div>
        );
    }
};

TitleComponent.propTypes = {
    title: PropTypes.string
};

export default TitleComponent;