import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        applicationTitle: state.commonData.title
    };
};

class TitleComponent extends Component {

    render() {

        const {applicationTitle} = this.props;

        return (
            <div className="main-title">
                Раздел {'"' + applicationTitle + '"'}
            </div>
        );
    }
}

export default connect(mapStateToProps)(TitleComponent);