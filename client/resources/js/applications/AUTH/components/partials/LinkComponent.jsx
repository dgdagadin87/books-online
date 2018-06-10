import React, {Component} from 'react';

import PropTypes from 'prop-types';

class LinkComponent extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            parentSiteUrl: props.parentSiteUrl,
            parentSiteName: props.parentSiteName
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            parentSiteUrl: nextProps.parentSiteUrl || '',
            parentSiteName: nextProps.parentSiteName || ''
        });
    }

    render() {
        
        const {parentSiteUrl, parentSiteName} = this.state;

        return (
            <div className="main-parentlink__container">
                <a
                    className="main-parentlink__control"
                    href={parentSiteUrl}
                    target="_blank"
                >
                    {parentSiteName}
                </a>
            </div>
        );
    }
}

LinkComponent.propTypes = {
    parentSiteUrl: PropTypes.string.isRequired,
    parentSiteName: PropTypes.string.isRequired
};

export default LinkComponent;