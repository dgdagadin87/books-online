import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {changeTitle} from '../../actions/common';

const mapStateToProps = () => {
    return {};
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        changeTitle: changeTitle
    }, dispatch);
}

class About extends Component {

    componentDidMount () {

        const {changeTitle} = this.props;
        changeTitle('О программе');
    }

    render() {

        return (
            <div className="main-about__container">
                О программе - полное описание здесь.
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);